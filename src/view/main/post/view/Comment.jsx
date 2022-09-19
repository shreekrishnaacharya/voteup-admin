import {
    Box,
    Typography,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardActions,
    styled,
    Stack,
    Grid,
    Button,
} from '@mui/material';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LaunchIcon from '@mui/icons-material/Launch';
import { Delete, Info } from '@mui/icons-material';
import ReactTimeAgo from 'react-time-ago'
import React from 'react';
import VoteButton from 'components/buttons/VoteButtons';
import Ranking from 'components/Ranking';
import Text from 'components/Text';
import { StatusCode, StatusList } from "links";
import { CopyToClipboard } from '_services';
import { Link } from 'react-router-dom';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);


function Comment({ comment, post, toaster }) {
    return (
        <Box mb={1}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={comment.user_dp} />}
                    titleTypographyProps={{ variant: 'h5' }}
                    subheaderTypographyProps={{ variant: 'subtitle2' }}
                    title={comment.username}
                />
                <Box px={2} pb={1}>
                    <Typography variant="h5" fontWeight="normal">
                        {comment.post_detail}
                    </Typography>
                </Box>
                <Box px={2}>
                    <Typography variant="subtitle2">
                        {/* <ReactTimeAgo date={new Date(comment.create_at)} locale="en-US" /> */}
                    </Typography>
                </Box>
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
                    >
                        <Grid item xl={6} >
                            <Stack direction="row" spacing={1} justifyContent="space-between">
                                <Button
                                    startIcon={<ShareTwoToneIcon />}
                                    variant="outlined"
                                    size='small'
                                    onClick={() => {
                                        CopyToClipboard(comment.link)
                                        toaster('Link copied!!!')
                                    }}
                                >
                                    Share
                                </Button>
                                {post.ptype == 1 && (
                                    <Button
                                        component={Link}
                                        to={"post?id=" + comment.parent_id}
                                        startIcon={<LaunchIcon />}
                                        variant="outlined"
                                        size='small'
                                        color='info'
                                    >
                                        Open Main Post
                                    </Button>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xl={6} >
                            <Box sx={{ mt: { xs: 1, md: 0 } }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    {post.ptype == 1 && (
                                        <Text
                                            sx={{ display: 'flex', mr: 1 }}
                                            color={StatusList[comment.statusCode].color}
                                        >
                                            {StatusList[comment.statusCode].icon}{comment.status}
                                        </Text>
                                    )}
                                    {post.statusCode > StatusCode.VOTING && (
                                        <>
                                            {/* <Text
                                                sx={{ display: 'flex', mr: 1 }}
                                                color={StatusList[comment.statusCode].color}
                                            >
                                                {StatusList[comment.statusCode].icon}{comment.status}
                                            </Text> */}
                                            {'|'}
                                            <Text
                                                sx={{ display: 'flex', mx: 1 }}
                                            >
                                                <ThumbUpIcon sx={{ mr: 1 }} />{comment.votes}
                                            </Text>{'|'}
                                            <Ranking voters={post.tot_votes} votes={comment.votes} />
                                        </>
                                    )}
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </CardActionsWrapper>
            </Card>
        </Box >
    );
}

export default Comment;