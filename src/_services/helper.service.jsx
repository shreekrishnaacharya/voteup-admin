const toBase64 = file => new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);

});

const getDateString = (date) => {
    return new Date(date).toDateString()
}

const getUpdateKey = (jsData, keys) => {
    for (const ky in keys) {
        if (jsData.hasOwnProperty(ky)) {
            jsData[keys[ky]] = jsData[ky];
            delete jsData[ky];
        }
    }
    return jsData;
};

const getJsonPhp = (jsData) => {
    const fData = new FormData();
    for (const jd in jsData) {
        if (jsData[jd] instanceof FileList) {
            fData.append(jd, jsData[jd][0]);
        } else if (jsData[jd] instanceof Array) {
            jsData[jd].forEach((val, index) => {
                if (val instanceof Object) {
                    for (const jddd in jsData[jd][index]) {
                        fData.append(`${jd}[${index}][${jddd}]`, jsData[jd][index][jddd]);
                    }
                } else {
                    fData.append(`${jd}[${index}]`, jsData[jd][index]);
                }
            });
        } else {
            fData.append(jd, jsData[jd]);
        }
    }
    return fData;
}

const getJsonForm = (jsData) => {
    const fData = new FormData();
    for (const jd in jsData) {
        if (jsData[jd] instanceof FileList) {
            fData.append(jd, jsData[jd][0]);
        } else if (jsData[jd] instanceof Array) {
            jsData[jd].forEach((val, index) => {
                if (val instanceof Object) {
                    for (const jddd in jsData[jd][index]) {
                        fData.append(`${jd}[${index}][${jddd}]`, jsData[jd][index][jddd]);
                    }
                } else {
                    fData.append(`${jd}[${index}]`, jsData[jd][index]);
                }
            });
        } else {
            fData.append(jd, jsData[jd]);
        }
    }
    return fData;
}

const getJsonForms = (jsData) => {
    const fData = new FormData();
    for (const jd of Object.keys(jsData)) {
        if (jsData[jd] instanceof FileList) {
            for (const jdd of Object.keys(jsData[jd])) {
                if (!isNaN(jdd)) {
                    fData.append(`${jd}[${jdd}]`, jsData[jd][jdd]);
                }
            }
        } else {
            fData.append(jd, jsData[jd]);
        }
    }
    return fData;
}

const isEmpty = (value) => {
    if (value === null || value === undefined || value === '' || value === 0 || value === false) {
        return true;
    }
    if (typeof value === 'function') {
        return false;
    }
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return true;
        }
    } else if (typeof value === 'object') {
        if (Object.keys(value).length === 0) {
            return true;
        }
    }
    return false;
};


export {
    isEmpty,
    toBase64,
    getJsonForm,
    getJsonForms,
    getUpdateKey,
    getDateString
}