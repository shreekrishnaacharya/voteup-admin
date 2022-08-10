
import { useHistory } from "react-router-dom";
import { pages } from "links/pages";
import BackDrop from "./BackDrop";
import TokenService from "_services/token.service";

const Methods = ({ logout }) => {
    const history = useHistory();
    const logoutButton = () => {
        TokenService.removeUser();
        history.push(pages.LOGIN);
    }
    if (logout) {
        logoutButton();
    }
    return (<>
        <BackDrop message="Logging out ..." />
    </>)
}

export default Methods;