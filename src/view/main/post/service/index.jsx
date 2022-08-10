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

async function addComment(id, idata) {
    return await getApiRequest({
        url: "/comment/" + id,
        method: "post",
        data: idata,
    }).then((result) => {
        return result;
    });
}

async function actionUpdate(id, type) {
    return await getApiRequest({
        url: "/comment",
        method: "put",
        data: {
            id,
            type
        },
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

async function getComments(id) {
    return await getApiRequest({
        url: "/comment/" + id,
    }).then((result) => {
        return result;
    });
}
async function deleteComment(id) {
    return await getApiRequest({
        url: "/comment/" + id,
        method: "delete",
    }).then((result) => {
        return result;
    });
}
export {
    addComment,
    actionUpdate,
    getViewPost,
    getComments,
    deleteComment
};