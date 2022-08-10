import * as React from 'react';
import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    Button,
    TextField,
    FormHelperText,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Input
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updatePassword } from "../../service";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object({
    old_password: yup.string().required('Old password is required'),
    temp_password: yup.string().required('New password is required'),
    confirm_password: yup.string().required('Confirm password is required').oneOf([yup.ref('temp_password')], 'Passwords does not match')
});
export default function ChangePassword({ open, setOpen }) {
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = React.useState({ new: false, old: false, temp: false });
    const { enqueueSnackbar } = useSnackbar();
    const handleClickShowPassword = (type) => {
        setShowPassword({ ...showPassword, [type]: !showPassword[type] });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const saveAction = (fdata) => {
        updatePassword(fdata).then(e => {
            if (e.flag) {
                enqueueSnackbar("Password changed", {
                    variant: 'success',
                });
            } else if (e.data.error) {
                enqueueSnackbar(e.data.error, {
                    variant: 'warning',
                });
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant="h3">Change Password</DialogTitle>
            <form onSubmit={handleSubmit(saveAction)}>
                <DialogContent>
                    <Divider />
                    <Typography variant="subtitle2">

                        <Grid mt={2} container spacing={1} justifyContent={'flex-end'}>
                            <Grid item xs={4} textAlign={{ sm: 'right' }}>
                                <Box pr={2} pb={2}>
                                    Old Password :
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="old_password"
                                    defaultValue={''}
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <>
                                                <Input
                                                    type={showPassword.old ? 'text' : 'password'}
                                                    {...field}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => { handleClickShowPassword('old') }}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showPassword.old ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    placeholder="Enter old password"
                                                />
                                                {fieldState.error && (
                                                    <FormHelperText size='small' error>
                                                        {fieldState.error?.message}
                                                    </FormHelperText>
                                                )}

                                            </>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    New Password :
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="temp_password"
                                    defaultValue={''}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                type={showPassword.new ? 'text' : 'password'}
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { handleClickShowPassword('new') }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Enter new password"
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    Confirm Password :
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="confirm_password"
                                    defaultValue={''}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                type={showPassword.temp ? 'text' : 'password'}
                                                {...field}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { handleClickShowPassword('temp') }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword.temp ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Confirm password"
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            </Grid>
                        </Grid>

                    </Typography>
                </DialogContent>
                <DialogActions sx={{ padding: '10px 20px' }}>
                    <Button color='error' onClick={handleClose}>Cancel</Button>
                    <Button color='primary' type={'submit'}>Change</Button>
                </DialogActions>
            </form>
        </Dialog>

    );
}
