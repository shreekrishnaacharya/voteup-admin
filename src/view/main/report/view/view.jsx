import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

import { useHistory, useLocation } from "react-router-dom";
// Soft UI Dashboard React components

import { Box, Skeleton, Grid, Button, Typography, Card, Divider, TextField, FormHelperText, Stack } from "@mui/material";
// Soft UI Dashboard React components
import { postPages } from "links/pages";
// Service
import { getViewReport, getViewPost } from "../service";
import { Temp } from '../model/list';
import Text from "components/Text";
import Post from "common/view/Post";
import PostLoad from "common/view/PostLoad";
import Comment from "view/main/post/view/Comment";
import { useSnackbar } from 'notistack';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { updateReport } from '../service'
const schema = yup.object({
    reply: yup.string().required("Reply"),
    status: yup.number().oneOf([1, 2]),
});

function ReportView() {
    const { enqueueSnackbar } = useSnackbar();
    const { handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [reportData, setReportData] = useState({});
    const [postData, setPostData] = useState(null);
    const history = useHistory();
    const { Status, Type } = Temp;
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id'), name = params.get('name');
    async function loadData() {
        await getViewReport(id)
            .then((res) => {
                if (res.flag) {
                    setReportData(res.data);
                    getViewPost(res.data.postid).then(e => {
                        setPostData(e.data)
                    })
                }
            });
    }
    const viewPost = (postid) => {
        history.push({
            pathname: postPages.POST,
            search: `?id=${postid}`,
            state: {
                id: postid
            }
        });
    }

    const saveAction = (fdata) => {
        updateReport(id, fdata).then((e) => {
            loadData();
        })
    }
    useEffect(() => {
        if (id !== undefined) {
            loadData();
        }
    }, [id]);


    if (Object.keys(reportData).length === 0) {
        return (<>
            <Box
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                backgroundColor="white"
                borderRadius="lg"
                p={3}
                mb={1}
                mt={2}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Skeleton animation="wave" variant="text" width="30%" height={30} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Skeleton style={{ margin: "10px" }} animation="wave" variant="rectangular" width="100%" height={"100%"} />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="30%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="20%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="40%" height={30} />
                            </Grid>
                            <Grid item xs={12}>
                                <Skeleton animation="wave" variant="text" width="20%" height={30} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>)
    }
    return (
        <>
            <Box mb={3} >
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                        <Typography variant="h3">{"Report View"}</Typography>
                    </Box>
                    <Divider />
                    <Box mb={3} px={3} py={2}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography fontWeight="regular">
                                    User
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography fontWeight="medium">
                                    :&nbsp;&nbsp;{reportData.user}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontWeight="regular">
                                    Create At
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography fontWeight="medium">
                                    :&nbsp;&nbsp;{reportData.create_at}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontWeight="regular">
                                    Voilance
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography fontWeight="medium">
                                    : {reportData.rtype}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontWeight="regular">
                                    Type
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography fontWeight="medium">
                                    :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Type type={reportData.type} />
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography fontWeight="regular">
                                    Status
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography fontWeight="medium">
                                    :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Status status={reportData.status} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box>
            <Box my={3}>
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                        <Typography variant="h3">{"Review"}</Typography>
                    </Box>
                    <Divider />
                    <Box mb={3} px={3} py={2}>
                        <Text>{reportData.remark}</Text>
                    </Box>
                </Card>
            </Box>
            <Box my={3}>
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                        <Typography variant="h3">{reportData.type}</Typography>
                    </Box>
                    <Divider />
                    <Box mb={-2}>
                        {postData == null ? (
                            <PostLoad />
                        ) : (
                            <>
                                {reportData.type === "POST" ? (
                                    <Post post={postData} viewPost={viewPost} />
                                ) : (
                                    <Comment comment={{ ...postData, comment: postData.post_detail }} />
                                )}
                            </>
                        )}
                    </Box>
                </Card>
            </Box>
            <Box my={3}>
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                        <Typography variant="h3">{"REPLY"}</Typography>
                    </Box>
                    <Divider />
                    <Box m={2}>
                        {reportData.statusCode != 0 ? (
                            <>
                                <Text>{reportData.reply}</Text>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit(saveAction)}>
                                <Stack>
                                    <Controller
                                        name="reply"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <TextField
                                                    sx={{ my: 2 }}
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    placeholder="Your reply here!"
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
                                    <Box display={'flex'} gap={2}>
                                        <Button
                                            color="error"
                                            type="submit"
                                            variant='contained'
                                            onClick={() => setValue('status', 2)}
                                        >Closed</Button>
                                        <Button
                                            color="warning"
                                            type="submit"
                                            variant='contained'
                                            onClick={() => setValue('status', 1)}
                                        >Ignore</Button>
                                    </Box>
                                </Stack>
                            </form>
                        )}
                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default ReportView;
