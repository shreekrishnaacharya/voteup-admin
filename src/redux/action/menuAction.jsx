import { MenuAction } from "../contants/action-types"

const setMiniSideNav = (menu) => {
    return {
        type: MenuAction.MINI_SIDENAV,
        payload: menu
    }
};

export {
    setMiniSideNav
}

// const setMiniSideNav = (menu) => {
//     return {
//         type: MenuAction.MINI_SIDENAV,
//         payload: menu
//     }
// };
// const setMiniSideNav = (menu) => {
//     return {
//         type: MenuAction.MINI_SIDENAV,
//         payload: menu
//     }
// };