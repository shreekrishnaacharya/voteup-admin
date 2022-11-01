import PropTypes from 'prop-types';

// material-ui
import logo from 'assets/images/logo.png'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <img src={logo} alt="Janamat" />
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
