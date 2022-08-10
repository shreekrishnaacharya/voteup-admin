import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addComment, deleteComment, getComments, getViewPost } from "../service";
import ConfirmDelete from "common/view/ConfirmDelete";
import Post from "common/view/Post";
import PostLoad from "common/view/PostLoad";
import Report from "common/view/Report";
import { useLocation, useHistory } from "react-router-dom";
import { pages } from "links";
import tokenService from "_services/token.service";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Text from "components/Text";
import CommentLoad from "./CommentLoad";
import { isEmpty } from "_services";
import { useSnackbar } from 'notistack';
import { addReport } from "common/service";

const ViewPost = () => {
    const userModel = tokenService.getUser();
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cloading, setCLoading] = useState(true);
    const [postFeeds, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const params = new URLSearchParams(location.search);
    const postid = params.get('id');
    const [report, setReport] = useState({
        open: false,
        postid: postid
    })
    const [confirm, setConfirm] = useState({
        open: false,
        postid: postid
    })
    const homePage = () => {
        history.push({
            pathname: pages.HOME
        });
    }
    const addCommentForm = (fdata) => {
        if (isEmpty(fdata.comment)) {
            enqueueSnackbar("Review cannot be blank", {
                variant: 'error',
            });
            return false;
        }
        addComment(postid, fdata).then(e => {
            if (e.flag) {
                enqueueSnackbar("Review uploaded", {
                    variant: 'success',
                });
                getComments(postid).then(res => {
                    if (res.flag) {
                        setComments(res.data);
                    }
                })
                getViewPost(postid).then(res => {
                    if (res.flag) {
                        console.log("post load")
                        setPost(res.data);
                    }
                })
            }
        })
    }

    const submitReportForm = (fdata) => {
        if (fdata.rtype == 0 || isEmpty(fdata.remark)) {
            enqueueSnackbar("Please complete the from", {
                variant: 'warning',
            });
            return;
        }
        addReport(report.postid, fdata).then(e => {
            if (e.status == 208) {
                enqueueSnackbar("Already reported", {
                    variant: 'info',
                });
                return;
            }
            if (e.flag) {
                enqueueSnackbar("Report submitted", {
                    variant: 'success',
                });
                reset()
                setReport({ open: false, postid: null });
            } else {
                enqueueSnackbar("Error in query", {
                    variant: 'error',
                });
            }
        })

    }

    const deleteCommentPost = (fdata) => {
        deleteComment(confirm.postid).then((e) => {
            if (e.flag) {
                enqueueSnackbar("Review deleted", {
                    variant: 'success',
                });
                setConfirm({ open: false, postid: null })
                getComments(postid).then(res => {
                    if (res.flag) {
                        setComments(res.data);
                    }
                })
                getViewPost(postid).then(res => {
                    if (res.flag) {
                        console.log("post load")
                        setPost(res.data);
                    }
                })
            }
        })
    }

    const handleMenu = (postid, type) => {
        if (type == 0) {
            setReport({ postid: postid, open: true })
        } else if (type == 2) {
            console.log('delete confirm open')
            setConfirm({ postid: postid, open: true })
        }
    }
    useEffect(() => {
        getComments(postid).then(res => {
            if (res.flag) {
                setComments(res.data);
                setCLoading(false);
            }
        })
        return () => {
            setComments([])
        }
    }, []);

    useEffect(() => {
        getViewPost(postid).then(res => {
            if (res.flag) {
                setPost(res.data);
                setLoading(false);
            }
        })
        return () => {
            setPost({})
        }
    }, []);

    return (
        <Box sx={{ margin: '20px' }}>
            {loading ? (
                <>
                    <PostLoad />
                </>
            ) : (
                <>
                    <Post key={postFeeds._id} post={postFeeds} onMenu={handleMenu} userModel={userModel} viewPost={() => { }} />
                </>
            )
            }

            <Box sx={{ marginLeft: '40px' }}>
                <Text varient={'h1'}>Review</Text>
                <AddComment userModel={userModel} onAddComment={addCommentForm} />
                {cloading ? (
                    <>
                        <CommentLoad />
                        <CommentLoad />
                    </>
                ) : (
                    <>
                        {comments.map(comment => {
                            return <Comment key={comment._id} comment={comment} setReport={setReport} setConfirm={setConfirm} userModel={userModel} />
                        })}
                    </>
                )
                }
            </Box>
            <Report open={report.open} onReport={submitReportForm} onClose={() => { setReport({ open: false, postid: null }) }} />
            <ConfirmDelete open={confirm.open} onDelete={deleteCommentPost} onClose={() => { setConfirm({ open: false, postid: null }) }} />
        </Box>
    );
};

export default ViewPost;
