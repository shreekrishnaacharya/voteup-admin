import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
const KycTypes = Object.freeze({
  LICENSES: 0,
  CITIZENSHIP: 1,
  PAN_CARD: 2,
  VOTER_CARD: 3,
  OTHER: 4
});

const KycStatus = Object.freeze({
  PENDING: 0,
  PROCESSING: 1,
  VERIFIED: 2,
  NOT_VERIFIED: 3
});

const KycStatusList = {
  [KycStatus.PENDING]: {
    color: 'info',
    icon: <ErrorOutlineIcon sx={{ mr: 1 }} />
  },
  [KycStatus.PROCESSING]: {
    color: 'primary',
    icon: <PendingIcon sx={{ mr: 1 }} />
  },
  [KycStatus.VERIFIED]: {
    color: 'success',
    icon: <CheckCircleIcon sx={{ mr: 1 }} />
  },
  [KycStatus.NOT_VERIFIED]: {
    color: 'error',
    icon: <ErrorIcon sx={{ mr: 1 }} />
  }
};

const StatusCode = Object.freeze({
  REVIEW: 0,
  VOTING: 1,
  RESULT: [3, 4],
  ACCEPT: 3,
  REJECT: 4,
  MANDATE: 5,
  REFERENDUM: 5
});

const StatusList = {
  [StatusCode.REVIEW]: {
    name: 'Reviewing',
    color: 'info',
    icon: <InsertCommentIcon sx={{ mr: 1 }} />
  },
  [StatusCode.VOTING]: {
    name: 'Voteing',
    color: 'primary',
    icon: <HowToVoteIcon sx={{ mr: 1 }} />
  },
  [StatusCode.ACCEPT]: {
    name: 'Mandate',
    color: 'success',
    icon: <CheckCircleIcon sx={{ mr: 1 }} />
  },
  [StatusCode.REJECT]: {
    name: 'Rejected',
    color: 'error',
    icon: <ErrorIcon sx={{ mr: 1 }} />
  },
  [StatusCode.MANDATE]: {
    name: 'Vote for Referendum',
    icon: <ThumbsUpDownIcon sx={{ mr: 1, color: '#ddd013' }} />
  },
  [StatusCode.REFERENDUM]: {
    name: 'Referendum',
    icon: <GppGoodIcon sx={{ mr: 1, color: '#00897b' }} />
  }
};

export { StatusCode, StatusList, KycTypes, KycStatusList, KycStatus };
