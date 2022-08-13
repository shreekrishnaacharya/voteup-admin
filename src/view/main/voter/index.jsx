import { Route } from 'react-router-dom';
import { voterPages } from "links";
import VoterList from './view/list';
import VoterView from './profile/index';

function VoterController() {
    return (
        <>
            <Route exact path={voterPages.VOTER_VIEW} component={VoterView} />
            <Route exact path={voterPages.VOTER} component={VoterList} />
        </>
    );
}

export default VoterController;