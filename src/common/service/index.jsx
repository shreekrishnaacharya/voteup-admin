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


async function getPost() {
    return await getApiRequest({
        url: "/user/mypost",
    }).then((result) => {
        return result;
    });
}


async function actionUpdate(id, type) {
    return await getApiRequest({
        url: "/feeds/action",
        method: "post",
        data: {
            id,
            type
        },
    }).then((result) => {
        return result;
    });
}

async function addReport(id, fdata) {
    return await getApiRequest({
        url: "/feeds/report/" + id,
        method: "post",
        data: getJsonForm(fdata),
    }).then((result) => {
        return result;
    });
}

async function deletePost(id) {
    return await getApiRequest({
        url: "/feeds/" + id,
        method: "delete"

    }).then((result) => {
        return result;
    });
}


export {
    actionUpdate,
    addReport,
    deletePost,
    getPost,
};