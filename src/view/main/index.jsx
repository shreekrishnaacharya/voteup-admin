import SidebarLayout from 'layouts/SidebarLayout';
import { pages } from 'links';
import { Route } from 'react-router-dom';
import Status404 from 'view/pages/Status404';
import FeedController from './feed';
import ViewPost from './post/view/ViewPost';
import ReportController from './report/';
import SettingController from './setting';
import VoterController from './voter/';

function MainController() {
    return (
        <div key="MainController">
            <SidebarLayout>
                <Route path={pages.VOTER} component={VoterController} />
                <Route path={pages.REPORT} component={ReportController} />
                <Route path={pages.FEEDS} component={FeedController} />
                <Route path={pages.POST} component={ViewPost} />
                <Route path={pages.SETTING} component={SettingController} />
                {/* <Route path={"/"} component={Status404} /> */}
            </SidebarLayout>
        </div>
    );
}

export default MainController;