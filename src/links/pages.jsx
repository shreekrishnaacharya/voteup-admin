const adminPages = {
    USER: "/user",
    PROFILE: "/profile"
}

const voterPages = {
    VOTER: "/voter",
    VOTER_VIEW: "/voter/view",
    VOTER_UPDATE: "/voter/update",
}

const reportPages = {
    REPORT: "/report",
    REPORT_VIEW: "/report/view",
    REPORT_UPDATE: "/report/update",
}

const feedPages = {
    FEEDS: "/feeds",
    FEEDS_VIEW: "/feeds/view",
}

const postPages = {
    POST: "/post",
}

const settingPages = {
    SETTING: "/setting",
}

const sitePage = {
    LOGIN: "/guest",
    NEW_PASSWORD: "/guest/new-password",
    VERIFY_ACCOUNT: "/guest/verify-account",
    SIGNUP: "/guest/signup",
    FORGOT_PASSWORD: "/guest/forgot-password",
    VERIFY_TOKEN: "/guest/verify-token",
}

const pages = {
    BASE_URL: "/api/admin",
    // BASE_URL: "http://ventvoila.com/api/admin",
    // BASE_URL: "http://localhost:8080/api/admin",
    // LOCAL_URL: "http://localhost:3000",
    GUEST: "/guest",
    HOME: "/",
    ...sitePage,
    ...voterPages,
    ...reportPages,
    ...feedPages,
    ...postPages,
    ...settingPages,
    ...adminPages
};

const guestPage = [
    pages.FORGOT_PASSWORD,
    pages.LOGIN,
    pages.SIGNUP,
    pages.NEW_PASSWORD,
    pages.VERIFY_ACCOUNT,
    pages.VERIFY_TOKEN,
];

const getFullUrl = (page) => {
    return pages.LOCAL_URL + "#" + page;
}

export { pages, sitePage, reportPages, voterPages, adminPages, feedPages, postPages, settingPages, guestPage, getFullUrl };