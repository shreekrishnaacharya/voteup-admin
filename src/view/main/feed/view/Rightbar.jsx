import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Skeleton
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from 'components/Text';
import LogoutIcon from '@mui/icons-material/Logout';
import { getRecent } from "../service";

import { useHistory, Link } from 'react-router-dom';
import { pages } from 'links';

const Loading = () => {

  return <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
    </ListItemAvatar>
    <ListItemText
      primary={<Skeleton animation="wave" height={20} width="80%" />}
      secondary={
        <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
      }
    />
  </ListItem>
}

const Rightbar = ({ tokenService }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [postFeeds, setFeeds] = useState([]);

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
    getRecent().then(res => {
      if (res.flag) {
        setFeeds(res.data);
        setLoading(false);
      }
    })
  }, []);

  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="sticky" width={350}>
        <Typography variant="h6" fontWeight={100}>
          Recent Posts
        </Typography>
        <Card>
          {loading ? (
            <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper', padding: "12px 0px" }}>
              <Loading />
              <Divider variant="inset" />
              <Loading />
              <Divider variant="inset" />
              <Loading />
            </List>
          ) : (
            <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper', padding: "12px 0px" }}>
              {postFeeds.map(post => {
                return <div key={'recent' + post._id}>
                  <a style={{cursor:"pointer"}} onClick={() => {
                    viewPost(post._id)
                  }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={post.username} src={post.user_dp} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={post.username}
                        secondary={
                          <Typography noWrap style={{ color: "#6E759F" }}>
                            {post.post_detail}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </a>
                  <Divider variant="inset" component="li" />
                </div>
              })}
            </List>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default Rightbar;
