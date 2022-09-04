import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Avatar,
    Button,
    CardActions,
    Link,
    styled,
} from '@mui/material';

import Text from 'components/Text';
import ReactTimeAgo from 'react-time-ago'
import React, { useState } from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import Ranking from 'components/Ranking';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PollIcon from '@mui/icons-material/Poll';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);
const statusList = {
    0: { color: 'info', icon: <InsertCommentIcon sx={{ mr: 1 }} /> },
    1: { color: 'primary', icon: <HowToVoteIcon sx={{ mr: 1 }} /> },
    2: { color: 'success', icon: <CheckCircleIcon sx={{ mr: 1 }} /> },
    3: { color: 'error', icon: <ErrorIcon sx={{ mr: 1 }} /> },
}

function Post({ post, userModel, isOpen }) {
    // console.log(post)

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
                    <Grid
                        container
                        direction={'row'}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xl={6} >
                            <Grid container direction={'row'} spacing={1}>
                                {isOpen ? (
                                    <Button disabled startIcon={<ThumbUpAltTwoTone />} variant={"outlined"}>
                                        Vote
                                    </Button>
                                ) : (
                                    <Button disabled startIcon={<CommentTwoTone />} variant="outlined">
                                        Review
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xl={6} >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <Text
                                    sx={{ display: 'flex', mr: 1 }}
                                    color={statusList[post.statusCode].color}
                                >
                                    {statusList[post.statusCode].icon}{post.status}
                                </Text>{'|'}
                                <Text
                                    sx={{ display: 'flex', mx: 1 }}
                                >
                                    <QuestionAnswerIcon sx={{ mr: 1 }} />{post.review}
                                </Text>
                                {post.statusCode > 0 && (
                                    <>{'|'}
                                        <Text
                                            sx={{ display: 'flex', mx: 1 }}
                                        >
                                            <PollIcon sx={{ mr: 1 }} />{post.tot_votes}
                                        </Text>{'|'}
                                        <Text
                                            sx={{ display: 'flex', mx: 1 }}
                                        >
                                            <ThumbUpIcon sx={{ mr: 1 }} />{post.votes}
                                        </Text>{'|'}
                                        <Ranking voters={post.tot_votes} votes={post.votes} />
                                    </>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </CardActionsWrapper>
            </Card>
        </Box >
    );
}

export default Post;  