// material-ui
import { Box } from '@mui/material';

import background from 'assets/images/background.png'
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
    return (
        <Box sx={{ position: 'absolute', filter: 'blur(5px)', zIndex: -1, bottom: 0, left: "10%" }}>
            <img src={background} />
        </Box>
    );
};

export default AuthBackground;
