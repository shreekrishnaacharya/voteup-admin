import * as React from 'react';
import {
    Grid,
    Typography,
    Divider,
    Button,
    Avatar,
    Box,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateProfile } from "../../service";
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setProfile } from 'redux/action/profileAction';
import { KycStatus } from 'links';
import Text from 'components/Text';

const schema = yup.object({
    kyc_status: yup.string().required("Action is required"),
});
export default function KycFile({ open, setOpen, handleKyc, userProfile }) {
    const { handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });
    const { enqueueSnackbar } = useSnackbar();

    const saveAction = (fdata) => {
        // console.log(fdata)
        handleKyc(fdata.kyc_status).then(e => {
            if (e.flag) {
                enqueueSnackbar("Kyc Uploaded", {
                    variant: 'success',
                });
                handleClose();
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
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'sm'}
            fullWidth
        >
            <DialogTitle variant="h3">Kyc File</DialogTitle>
            <form onSubmit={handleSubmit(saveAction)}>
                <DialogContent >
                    <Divider />
                    <Typography variant="subtitle2">
                        <Grid mt={2} container spacing={1} justifyContent={'flex-end'}>
                            <Grid item xs={12}>
                                <Text>{userProfile.kycType}</Text>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    component={'img'}
                                    src={userProfile.kycFile}
                                    sx={{ width: '250px' }}
                                />
                            </Grid>
                        </Grid>
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ padding: '10px 20px' }}>
                    {userProfile.kycStatusCode == KycStatus.PROCESSING && (
                        <>
                            <Button
                                color='success'
                                variant='contained'
                                disableElevation
                                disabled={isSubmitting}
                                onClick={() => setValue('kyc_status', KycStatus.VERIFIED)}
                                type={'submit'}>Accept</Button>
                            <Button
                                color='warning'
                                variant='contained'
                                disableElevation
                                onClick={() => setValue('kyc_status', KycStatus.NOT_VERIFIED)}
                                disabled={isSubmitting}
                                type={'submit'}>Reject</Button>
                        </>
                    )}
                    <Button color='info' variant='contained' onClick={handleClose}>Close</Button>
                </DialogActions>
            </form>
        </Dialog>

    );
}
