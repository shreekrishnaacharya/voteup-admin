import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";

// material-ui
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useSnackbar } from 'notistack';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

import TokenService from "_services/token.service";
import { pages } from 'links';
import { getLogin } from 'view/site/service';

const schema = yup.object({
    username: yup.string().required("Email cannot be blank").email(),
    password: yup.string().required("Password cannot be blank"),
});

const AuthLogin = () => {
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { enqueueSnackbar } = useSnackbar();

    const onSubmitHandler = async (fdata) => {
        await getLogin(fdata).then((res) => {
            if (res.flag == true) {
                enqueueSnackbar("Login success", {
                    variant: 'success',
                });
                TokenService.setUser({
                    ...res.data
                });
                history.push({
                    pathname: pages.HOME
                });
            } else {
                enqueueSnackbar("Invalid login detail", {
                    variant: 'error',
                });
            }
        });
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Controller
                                name="username"
                                defaultValue=""
                                control={control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                            <OutlinedInput
                                                id="email-login"
                                                type="email"
                                                placeholder="Enter email address"
                                                fullWidth
                                                {...field}
                                            // error={Boolean(fieldState.error)}
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )
                                }}
                            />

                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Controller
                                name="password"
                                defaultValue=""
                                control={control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel htmlFor="password-login">Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                // error={Boolean(fieldState.error)}
                                                id="-password-login"
                                                type={showPassword ? 'text' : 'password'}
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Enter password"
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}

                                        </>
                                    )
                                }}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                        size="small"
                                    />
                                }
                                label={<Typography variant="h6">Keep me sign in</Typography>}
                            />
                            <Link variant="h6" component={RouterLink} to={pages.FORGOT_PASSWORD} color="text.primary">
                                Forgot Password?
                            </Link>
                        </Stack>
                    </Grid>
                    {/* {errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                    )} */}
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default AuthLogin;
