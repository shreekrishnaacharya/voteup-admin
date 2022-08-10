import PropTypes from 'prop-types';

// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';

// assets
import AuthBackground from './AuthBackground';
import { pages } from 'links';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
    <Box>
        <AuthBackground />
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '60vh'
            }}
        >
            <Grid item xs={12} sx={{ ml: 2, mt: 2 }}>
                <Logo to={pages.HOME} />
            </Grid>
            <Grid item xs={12}>
                <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 250px)', md: 'calc(100vh - 200px)' } }}
                >
                    <Grid item>
                        <AuthCard>{children}</AuthCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
);

AuthWrapper.propTypes = {
    children: PropTypes.node
};

export default AuthWrapper;
