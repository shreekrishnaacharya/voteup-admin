import PropTypes from 'prop-types';
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
    MenuItem,
    Chip,
    Grid
} from '@mui/material';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from 'components/Text';
import ReactTimeAgo from 'react-time-ago'
import React, { useEffect, useState } from 'react';
import { actionUpdate } from "../service";
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import VoteButton from 'components/buttons/VoteButtons';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Ranking from 'components/Ranking';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PollIcon from '@mui/icons-material/Poll';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { StatusCode, StatusList } from 'links/constant';
import { CopyToClipboard } from '_services';
const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);



function Post({ post, viewPost, isOpen, toaster }) {
    // console.log(post)
    // const [paction, setPaction] = useState({
    //     votes: post.votes,
    //     hasVote: post.hasVote,
    //     review: post.review
    // });


    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleOptionClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOptionClose = () => {
        setAnchorEl(null);
    };
 

    // useEffect(() => {
    //     setPaction(post);
    // }, [post]);


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
                        // onClick={(e) => {
                        //     openLightbox(e, {
                        //         index,
                        //         photo: photos[index],
                        //         previous: photos[index - 1] || null,
                        //         next: photos[index + 1] || null,
                        //     })
                        // }}
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
                        display: { xs: 'flex', md: 'flex' },
                        py: 1.5,
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
                            <Grid container direction={'row'}>
                                <Grid item xl={6}>
                                    {isOpen ? (
                                        <>
                                            {post.statusCode == StatusCode.VOTING && (
                                                <VoteButton post={post}
                                                    sx={{ mr: { xs: 0.5, md: 2 } }}
                                                    onClick={onVote} hasVote={post.hasVote} />
                                            )}
                                        </>
                                    ) : (
                                        <Button
                                            startIcon={<CommentTwoToneIcon />}
                                            variant="outlined"
                                            sx={{ mr: { xs: 0.5, md: 2 } }}
                                            onClick={() => {
                                                viewPost(post._id)
                                            }}
                                        >
                                            View
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xl={6}>
                                    <Button
                                        startIcon={<ShareTwoToneIcon />}
                                        variant="outlined"
                                        onClick={() => {
                                            CopyToClipboard(post.link)
                                            toaster('Link copied!!!')
                                        }}
                                    >
                                        Share
                                    </Button>
                                </Grid>
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
                                    color={StatusList[post.statusCode].color}
                                >
                                    {StatusList[post.statusCode].icon}{post.status}
                                </Text>{'|'}
                                <Text
                                    sx={{ display: 'flex', mx: 1 }}
                                >
                                    <QuestionAnswerIcon sx={{ mr: 1 }} />{post.review}
                                </Text>
                                {post.statusCode > StatusCode.VOTING && (
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


Post.propTypes = {
    post: PropTypes.object.isRequired,
    onMenu: PropTypes.func.isRequired,
    userModel: PropTypes.object.isRequired,
    viewPost: PropTypes.func.isRequired,
    onVote: PropTypes.func,
    isOpen: PropTypes.bool
}

Post.defaultProps = {
    isOpen: false,
}
export default Post;  