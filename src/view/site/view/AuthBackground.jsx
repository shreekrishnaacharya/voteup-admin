// material-ui
import { Box } from '@mui/material';

import background from 'assets/images/bg.png'
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    return (
        <Box sx={{
            position: 'fixed',
            // filter: 'blur(5px)',
            zIndex: -1,
            width: '100%',
            height: '100%',
            background: `url(${background}) repeat center center fixed`,
            backgroundSize: 'auto'
        }}>
        </Box>
    );
};

export default AuthBackground;
