import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    Button,
    TextField,
    FormHelperText
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
    mystory: yup.mixed()
});
export default function UserStory() {
    const dispatch = useDispatch();
    const [editForm, setEditForm] = useState(false)
    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const userProfile = useSelector(state => state.profile);
    const { mystory } = userProfile
    const { enqueueSnackbar } = useSnackbar();

    const saveAction = (fdata) => {
        updateProfile(fdata).then(e => {
            if (e.flag) {
                enqueueSnackbar("Story updated", {
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
                        My Story
                    </Typography>
                    <Typography variant="subtitle2">
                        Manage story that showcase on your profile
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
                                Story:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {editForm ? (
                                <Controller
                                    name="mystory"
                                    defaultValue={mystory}
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
                                    <b>{mystory}</b>
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