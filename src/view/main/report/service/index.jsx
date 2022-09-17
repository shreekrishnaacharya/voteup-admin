import { getApiRequest as getApi, getJsonForm } from '_services';


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


async function getViewReport(id) {
    return await getApiRequest({
        url: "/report/" + id,
    }).then((result) => {
        return result;
    });
}

async function getViewPost(id) {
    return await getApiRequest({
        url: "/feeds/" + id,
    }).then((result) => {
        return result;
    });
}

async function getReports(pages) {
    return await getApiRequest({
        url: "/report/",
        data: {
            size: 5,
            ...pages
        }
    }).then((result) => {
        return result;
    });
}
async function updateReport(id, data) {
    return await getApiRequest({
        url: "/report/" + id,
        method: "put",
        data
    }).then((result) => {
        return result;
    });
}
export {
    updateReport,
    getViewReport,
    getReports,
    getViewPost
};