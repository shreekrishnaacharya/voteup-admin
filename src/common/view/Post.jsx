import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Avatar,
    IconButton,
    Button,
    CardActions,
    Link,
    styled,
    Stack,
    Menu,
    MenuItem
} from '@mui/material';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from 'components/Text';
import { ThumbDownOffAltTwoTone } from '@mui/icons-material';
import ReactTimeAgo from 'react-time-ago'
import React, { useCallback, useEffect, useState } from 'react';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);


function Post({ post, viewPost }) {
    // console.log(post)
    const [paction, setPaction] = useState({
        up_vote: post.up_vote,
        down_vote: post.down_vote,
        vtype: post.vtype,
        review: post.review
    });
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOptionClose = () => {
        setAnchorEl(null);
    };
    const handleOptionAction = (type) => {
        onMenu(post._id, type)
        setAnchorEl(null);
    }

    useEffect(() => {
        setPaction(post);
    }, [post]);


    let tagsList = [];
    if (post.tags !== null) {
        tagsList = post.tags.split(",").map(hash => {
            return <><Link href="#" underline="hover">
                {hash}
            </Link>{" "}</>
        })
    }

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    const ImageView = () => {
        if (post.meta.length == 0) {
            return "";
        }
        return (<CardContent>
            <ImageList
                sx={{ width: "100%", height: "auto" }}
                variant="quilted"
                cols={2}
                rowHeight={151}
            >
                {post.meta.map((item, index) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 151, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </CardContent>)
    }
    return (
        <Box mb={2}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={post.user_dp} />}
                    // action={
                    //     <>
                    //         <IconButton
                    //             color="primary"
                    //             onClick={handleOptionClick}
                    //         >
                    //             <MoreHorizTwoToneIcon fontSize="medium" />
                    //         </IconButton>
                    //         <Menu
                    //             anchorEl={anchorEl}
                    //             open={open}
                    //             onClose={handleOptionClose}
                    //         >
                    //             <MenuItem onClick={() => { handleOptionAction(0) }}>Report</MenuItem>
                    //         </Menu>
                    //     </>
                    // }
                    titleTypographyProps={{ variant: 'h4' }}
                    subheaderTypographyProps={{ variant: 'subtitle2' }}
                    title={post.username}
                    subheader={
                        <>
                            {tagsList}
                        </>
                    }
                />
                <Box px={3} pb={2}>
                    <Typography variant="h4" fontWeight="normal">
                        {post.post_detail}
                    </Typography>
                </Box>
                <ImageView />
                <Box p={1}>
                    <Typography variant="subtitle2">
                        <ReactTimeAgo date={new Date(post.create_at)} locale="en-US" />
                        {' | '}Supporters{' : '}
                        <Text>
                            <b>{post.supporters}</b>
                        </Text>
                    </Typography>
                </Box>
                <Divider />
                <CardActionsWrapper
                    sx={{
                        display: { xs: 'block', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Button disabled startIcon={<ThumbUpAltTwoToneIcon />} variant={"outlined"}>
                            Like
                        </Button>
                        <Button disabled startIcon={<ThumbDownOffAltTwoTone />} variant={"outlined"}>
                            Dislike
                        </Button>
                        <Button
                            startIcon={<CommentTwoToneIcon />}
                            variant="outlined"
                            sx={{ mx: 2 }}
                            onClick={() => {
                                viewPost(post._id)
                            }}
                        >
                            Review
                        </Button>
                        <Button disabled startIcon={<ShareTwoToneIcon />} variant="outlined">
                            Share
                        </Button>
                    </Stack>
                    <Box sx={{ mt: { xs: 2, md: 0 } }}>
                        <Typography variant="subtitle2" component="span">
                            <Text color="info">
                                <b>{paction.review}</b>
                            </Text>{' '}
                            Review{' | '}
                            <Text color="success">
                                <b>{paction.up_vote}</b>
                            </Text>{' '}
                            Likes{' | '}
                            <Text color="error">
                                <b>{paction.down_vote}</b>
                            </Text>{' '}
                            Dislike
                        </Typography>
                    </Box>
                </CardActionsWrapper>
            </Card>
        </Box >
    );
}

export default Post;  