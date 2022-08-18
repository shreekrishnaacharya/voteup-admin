import { getApiRequest as getApi } from '_services';


const getApiRequest = async (requestData) => {
    // console.log(requestData);
    const result = await getApi({
        ...requestData
    }).then(function (response) {
        return { flag: true, headers: response.headers, status: response.status, message: "Success", data: response.data };
    }).then(function (finalJson) {
        return finalJson;
    }).catch((error) => {
        // console.log(error);
        return { flag: false, status: error.status, message: "Error", data: error.data };
    });
    return result;
}


async function getDashboard() {
    return await getApiRequest({
        url: "/dashboard",
    }).then((result) => {
        return result;
    });
}

export {
    getDashboard
};