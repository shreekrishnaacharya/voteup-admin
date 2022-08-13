import { Route } from 'react-router-dom';
import { reportPages } from "links";
import ReportList from './view/list';
import ReportView from './view/view';

function ReportController() {
    return (
        <>
            <Route exact path={reportPages.REPORT_VIEW} component={ReportView} />
            <Route exact path={reportPages.REPORT} component={ReportList} />
        </>
    );
}

export default ReportController;