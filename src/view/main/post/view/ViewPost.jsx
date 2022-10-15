import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getViewPost } from "../service";
import ConfirmDelete from "common/view/ConfirmDelete";
import Post from "common/view/Post";
import PostLoad from "common/view/PostLoad";
import Report from "common/view/Report";
import { useLocation, useHistory } from "react-router-dom";
import { pages, StatusCode } from "links";
import tokenService from "_services/token.service";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Text from "components/Text";
import { isEmpty } from "_services";
import { useSnackbar } from 'notistack';
import { addReport } from "common/service";

const ViewPost = () => {
    const userModel = tokenService.getUser();
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [postFeeds, setPost] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    // const myRef = useRef(null)
    // const executeScroll = () => myRef.current.scrollIntoView()
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

    const initLoad = async () => {
        const res = await getViewPost(postid);
        if (res.flag) {
            setPost(res.data);
            setLoading(false);
        }
    }


    useEffect(() => {
        initLoad()
        return () => {
            setPost({})
            setConfirm({ open: false, postid: null })
        }
    }, [postid]);

    let tagsList = "";
    if ("tags" in postFeeds && postFeeds.tags !== null) {
        tagsList = postFeeds.tags.replace(/,/gi, " | ")
    }
    return (
        <>
            <Box sx={{ pt: 2 }}>
                {loading ? (
                    <>
                        <PostLoad isOpen={true} />
                    </>
                ) : (
                    <>

                        {postFeeds.ptype == 0 ? (
                            <Post toaster={enqueueSnackbar}
                                // flash={postid === postFeeds.post_id} 
                                isOpen={true} key={postFeeds._id} post={postFeeds} viewPost={() => { }} />
                        ) : (
                            <Comment toaster={enqueueSnackbar}
                                // flash={postid === postFeeds.post_id} 
                                post={postFeeds} key={postFeeds._id} comment={postFeeds} />
                        )}


                        {postFeeds.ptype == 0 && postFeeds.comments.length > 0 && (
                            <Box sx={{ marginLeft: '40px' }}>
                                <Text varient={'h1'}>Amend/Dissent</Text>
                                {postFeeds.comments.map(comment => {
                                    return <Comment toaster={enqueueSnackbar}
                                        // ref={postid === comment.post_id ? myRef : null} 
                                        // flash={postid === comment.post_id}
                                        post={postFeeds}
                                        key={comment._id} comment={comment} />
                                })}
                            </Box>
                        )}
                    </>
                )
                }
            </Box>
        </>
    );
};

export default ViewPost;
