const votePages = {
    VOTER: "/voter",
    VOTER_VIEW: "/voter/view",
    VOTER_UPDATE: "/voter/update",
}

const reportPages = {
    REPORT: "/report",
    REPORT_VIEW: "/report/view",
    REPORT_UPDATE: "/report/update",
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
    // BASE_URL: "https://app-f51dd389-d290-44a4-914c-af2905391a7c.cleverapps.io",
    BASE_URL: "http://localhost:8080/admin",
    // LOCAL_URL: "http://localhost:3000",
    GUEST: "/guest",
    HOME: "/",
    ...sitePage,
    ...votePages,
    ...reportPages
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

export { pages, sitePage, reportPages, votePages, guestPage, getFullUrl };