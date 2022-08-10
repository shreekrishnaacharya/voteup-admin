import { Route, Switch } from 'react-router-dom';
import { pages } from 'links';
import VoterList from './voter/view/list';


function MainController() {
    console.log("main")
    return (
        <div key="MainController">
            <Switch>
                <Route path={"*"} component={VoterList} />
            </Switch>
        </div>
    );
}

export default MainController;