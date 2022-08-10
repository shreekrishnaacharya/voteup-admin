import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    Button,
    TextField,
    Input,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'components/Text';
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateProfile } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "redux/action/profileAction";

const schema = yup.object({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    // email: yup.string().required("Email name is required"),
    contact: yup.string().required("Contact is required"),
    dob: yup.string().required("Date of Birth is required"),
    address1: yup.string().required("Address1 is required"),
    address2: yup.string()
});
export default function PersonalDetail() {
    const dispatch = useDispatch();
    const [editForm, setEditForm] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const userProfile = useSelector(state => state.profile);
    const { enqueueSnackbar } = useSnackbar();

    const saveAction = (fdata) => {
        updateProfile(fdata).then(e => {
            if (e.flag) {
                enqueueSnackbar("Profile updated", {
                    variant: 'success',
                });
                dispatch(setProfile({ ...userProfile, ...e.data }))
                setEditForm(false)
            }
        })
    }

    return (<form onSubmit={handleSubmit(saveAction)}>
        <Card>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Personal Details
                    </Typography>
                    <Typography variant="subtitle2">
                        Manage informations related to your personal details
                    </Typography>
                </Box>
                {editForm ? (
                    <Button
                        type="submit"
                        variant="text" color='success' startIcon={<DoneTwoToneIcon />}>
                        Save
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setEditForm(true)
                            return false;
                        }}
                        component={'span'}
                        variant="text" startIcon={<EditTwoToneIcon />}>
                        Edit
                    </Button>
                )}
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Name:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Grid direction="row" container spacing={3}>
                                    <Grid item xs={6}>
                                        <Controller
                                            name="fname"
                                            defaultValue={userProfile.fname}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <TextField
                                                        sx={{ width: "100%" }}
                                                        variant="standard"
                                                        {...field}
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
                                    <Grid item xs={6}>
                                        <Controller
                                            name="lname"
                                            defaultValue={userProfile.lname}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <>
                                                    <TextField
                                                        sx={{ width: "100%" }}
                                                        variant="standard"
                                                        {...field}
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
                            ) : (
                                <Text color="black">
                                    <b>{userProfile.name}</b>
                                </Text>
                            )
                            }

                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Gender:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Controller
                                    name="gender"
                                    defaultValue={userProfile.gender}
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <>
                                                <RadioGroup
                                                    {...field}
                                                    row
                                                    sx={{ marginTop: '-5px' }}
                                                >
                                                    <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
                                                    <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
                                                    <FormControlLabel value="Other" control={<Radio size="small" />} label="Other" />
                                                </RadioGroup>
                                                {fieldState.error && (
                                                    <FormHelperText error>
                                                        {fieldState.error?.message}
                                                    </FormHelperText>
                                                )}
                                            </>
                                        )
                                    }}
                                />
                            ) : (
                                <Text color="black">
                                    <b>{userProfile.gender}</b>
                                </Text>
                            )
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Date of birth:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Controller
                                    name="dob"
                                    defaultValue={userProfile.dob}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                sx={{ width: "100%" }}
                                                type={'date'}
                                                variant="standard"
                                                {...field}
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            ) : (
                                <Text color="black">
                                    <b>{userProfile.dob}</b>
                                </Text>
                            )
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Contact:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Controller
                                    name="contact"
                                    defaultValue={userProfile.contact}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <TextField
                                                sx={{ width: "100%" }}
                                                variant="standard"
                                                {...field}
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            ) : (
                                <Text color="black">
                                    <b>{userProfile.contact}</b>
                                </Text>
                            )
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Address1:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Controller
                                    name="address1"
                                    defaultValue={userProfile.address1}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <TextField
                                                sx={{ width: "100%" }}
                                                variant="standard"
                                                {...field}
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            ) : (
                                <Text color="black">
                                    <b>{userProfile.address1}</b>
                                </Text>
                            )
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Address2:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Controller
                                    name="address2"
                                    defaultValue={userProfile.address2}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <TextField
                                                sx={{ width: "100%" }}
                                                variant="standard"
                                                {...field}
                                            />
                                            {fieldState.error && (
                                                <FormHelperText error>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            )}
                                        </>
                                    )}
                                />
                            ) : (
                                <Text color="black">
                                    <b>{userProfile.address2}</b>
                                </Text>
                            )
                            }
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>
    </form>)
}