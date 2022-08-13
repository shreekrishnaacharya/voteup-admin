import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  styled
} from '@mui/material';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import coverImage from 'assets/images/cover_image.png'
import ImageLoader from 'components/ImageLoader';


const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(36)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user }) => {

  return (
    <>
      <CardCover>
        <CardMedia image={user ? user.cover : coverImage} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user?.name} src={user?.image} />
      </AvatarWrapper>
      <Box pt={2} pl={2}>
        <Typography gutterBottom variant="h4">
          {user?.name}
        </Typography>
        <Typography variant="subtitle2">{user?.mystory}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user?.address1} | {user?.address2} | {user?.state}
        </Typography>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
