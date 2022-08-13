import { getJsonForms } from '_services';
import { getApiRequest as getApi, getJsonForm } from '_services';


const getApiRequest = async (requestData) => {
    const result = await getApi({
        ...requestData
    }).then(function (response) {
        return { flag: true, headers: response.headers, status: response.status, message: "Success", data: response.data };
    }).then(function (finalJson) {
        return finalJson;
    }).catch((error) => {
        // console.log(error)
        return { flag: false, status: error.response?.status, message: "Error", data: error.response?.data };
    });
    return result;
}

async function getVoterList(pages) {
    return await getApiRequest({
        url: "/voter",
        data: {
            size: 5,
            ...pages
        }
    }).then((result) => {
        return result;
    });
}

async function getVoterView(id) {
    return await getApiRequest({
        url: "/voter/" + id,
    }).then((result) => {
        return result;
    });
}


export {
    getVoterList,
    getVoterView
};