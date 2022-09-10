import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const StatusCode = Object.freeze({
    REVIEW: 0,
    VOTING: 1,
    RESULT: 2,
    ACCEPT: 3,
    REJECT: 4
})


const StatusList = {
    [StatusCode.REVIEW]: { name: 'Reviewing', color: 'info', icon: <InsertCommentIcon sx={{ mr: 1 }} /> },
    [StatusCode.VOTING]: { name: 'Voteing', color: 'primary', icon: <HowToVoteIcon sx={{ mr: 1 }} /> },
    [StatusCode.ACCEPT]: { name: 'Accepted', color: 'success', icon: <CheckCircleIcon sx={{ mr: 1 }} /> },
    [StatusCode.REJECT]: { name: 'Rejected', color: 'error', icon: <ErrorIcon sx={{ mr: 1 }} /> },
    [StatusCode.RESULT]: { name: 'Result', color: 'warning', icon: <PendingActionsIcon sx={{ mr: 1 }} /> },
}

export { StatusCode, StatusList }