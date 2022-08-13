import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, ButtonBase } from '@mui/material';
import logo from 'assets/images/logo.png'
// project import
import Logo from './Logo';
import { pages } from 'links';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <img src={logo} alt="Janamat" />
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
