import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getComments, getViewPost } from "../service";
import Post from "common/view/Post";
import PostLoad from "common/view/PostLoad";
import { useLocation, useHistory } from "react-router-dom";
import Comment from "./Comment";
import Text from "components/Text";
import CommentLoad from "./CommentLoad";

const ViewPost = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [cloading, setCLoading] = useState(true);
    const [postFeeds, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const params = new URLSearchParams(location.search);
    const postid = params.get('id');

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
        <Box>
            {loading ? (
                <>
                    <PostLoad />
                </>
            ) : (
                <>
                    <Post key={postFeeds._id} post={postFeeds} />
                </>
            )
            }
            <Box sx={{ marginLeft: '40px' }}>
                <Text varient={'h1'}>Review</Text>
                {loading ? (
                    <>
                        <CommentLoad />
                        <CommentLoad />
                    </>
                ) : (
                    <>
                        {postFeeds.comments.map(comment => {
                            return <Comment key={comment._id} comment={comment} />
                        })}
                    </>
                )
                }
            </Box>
        </Box>
    );
};

export default ViewPost;
