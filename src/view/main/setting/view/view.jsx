import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    TextField,
    Input,
    FormHelperText,
    Skeleton,
    Button
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';

import Text from 'components/Text';
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateSetting, getSetting } from "../service";

const schema = yup.object({
    review_limit: yup.number().min(1).required("Review period is required"),
    vote_limit: yup.number().min(1).required("Voting period is required"),
    approve_on: yup.number().min(1).required("Approve at is required"),
});
export default function Setting() {
    const [editForm, setEditForm] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [settingData, setSetting] = useState(null)
    const { enqueueSnackbar } = useSnackbar();

    const saveAction = (fdata) => {
        updateSetting(fdata).then(e => {
            if (e.flag) {
                enqueueSnackbar("Setting updated", {
                    variant: 'success',
                });
                setSetting({ ...fdata })
                setEditForm(false)
            }
        })
    }

    useEffect(() => {
        getSetting().then(e => {
            if (e.flag) {
                setSetting({ ...e.data })
            }
        })
    }, [])

    return (<form onSubmit={handleSubmit(saveAction)}>
        <Card>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Typography variant="h3">{"Setting"}</Typography>
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
                        disabled={settingData == null ? true : false}
                        component={'span'}
                        variant="text" startIcon={<EditTwoToneIcon />}>
                        Edit
                    </Button>
                )}
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
                {settingData == null ? (
                    <>
                        <Skeleton sx={{ margin: "5px 0", fontSize: '2rem' }} width={"40%"} variant="text" />
                        <Skeleton sx={{ margin: "15px 0", fontSize: '2rem' }} width={"20%"} variant="text" />
                        <Skeleton sx={{ margin: "15px 0", fontSize: '2rem' }} width={"60%"} variant="text" />
                    </>
                ) : (
                    <Typography variant="subtitle2">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    Review period:
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                {editForm ? (
                                    <Controller
                                        name="review_limit"
                                        defaultValue={settingData.review_limit}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <Input
                                                    sx={{ width: "50%" }}
                                                    variant="standard"
                                                    {...field}
                                                    type={'number'}
                                                /> Day(s)
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
                                        <b>{settingData.review_limit}</b> Day(s)
                                    </Text>
                                )
                                }
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    Voting period:
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                {editForm ? (
                                    <Controller
                                        name="vote_limit"
                                        defaultValue={settingData.vote_limit}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <TextField
                                                    sx={{ width: "50%" }}
                                                    variant="standard"
                                                    {...field}
                                                    type={'number'}
                                                /> Day(s)
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
                                        <b>{settingData.vote_limit}</b> Day(s)
                                    </Text>
                                )
                                }
                            </Grid>
                            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    Approve On:
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                {editForm ? (
                                    <Controller
                                        name="approve_on"
                                        defaultValue={settingData.approve_on}
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <TextField
                                                    sx={{ width: "50%" }}
                                                    variant="standard"
                                                    {...field}
                                                    type={'number'}
                                                /> Percent(%)
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
                                        <b>{settingData.approve_on}</b> Percent(%)
                                    </Text>
                                )
                                }
                            </Grid>
                        </Grid>
                    </Typography>
                )}

            </CardContent>
        </Card>
    </form>)
}