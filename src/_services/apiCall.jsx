import axios from "axios";
import { pages } from "links/pages";
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: pages.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
            // config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
let refreshTokenRequest = false;

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        // console.log(err);
        let originalConfig = err.config;
        // console.log(refreshTokenRequest);
        if (originalConfig.url != pages.LOGIN && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !refreshTokenRequest) {
                refreshTokenRequest = true;
                try {
                    const rs = await instance.post("/auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });
                    const { token } = rs.data;
                    TokenService.updateLocalAccessToken(token);
                    return instance(originalConfig);
                } catch (_error) {
                    TokenService.removeUser();
                    window.location.reload();
                    return Promise.reject(_error);
                }
            } else if (refreshTokenRequest) {
                refreshTokenRequest = false;
                TokenService.removeUser();
            }
        }
        return Promise.reject(err);
    }
);

const getApiRequest = async (options) => {
    let method = 'get';
    if ('method' in options) {
        method = (options.method).toLowerCase()
    }
    const url = options.url;
    delete options['method'];
    delete options['url'];
    if (method == 'get' || method == 'delete') {
        options['params'] = options.data;
        delete options['data'];
        return instance[method](url, options);
    } else {
        const data = options.data;
        delete options['data'];
        return instance[method](url, data, options);
    }
}


export { getApiRequest };
