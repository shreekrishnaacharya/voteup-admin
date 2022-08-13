import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFeeds, getPost } from "../service";
import ConfirmDelete from "common/view/ConfirmDelete";
import Post from "common/view/Post";
import PostLoad from "common/view/PostLoad";
import Report from "common/view/Report";
import { useHistory } from "react-router-dom";
import { pages } from "links";
import { addReport } from "common/service";
import { deletePost } from "common/service";
import { useSnackbar } from 'notistack';
import { isEmpty } from "_services";

const Feed = ({ userModel, feedType }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [postFeeds, setFeeds] = useState([]);
  const [report, setReport] = useState({
    open: false,
    postid: null
  })
  const [confirm, setConfirm] = useState({
    open: false,
    postid: null
  })
  const { enqueueSnackbar } = useSnackbar();
  const viewPost = (postid) => {
    history.push({
      pathname: pages.POST,
      search: `?id=${postid}`,
      state: {
        id: postid
      }
    });
  }



  useEffect(() => {
    if (feedType == 'profile') {
      getPost(userModel._id).then(res => {
        if (res.flag) {
          setFeeds(res.data);
          setLoading(false);
        }
      })
    } else {
      getFeeds().then(res => {
        if (res.flag) {
          setFeeds(res.data);
          setLoading(false);
        }
      })
    }

    return () => {
      setFeeds([])
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <>
          <PostLoad />
          <PostLoad />
        </>
      ) : (
        <>
          {postFeeds.map(post => {
            return <Post key={post._id} post={post} viewPost={viewPost} />
          })}
        </>
      )
      }
    </Box >
  );
};

export default Feed;
