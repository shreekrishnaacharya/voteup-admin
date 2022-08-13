import {
    Box,
    Typography,
    Card,
    CardHeader,
    Divider,
    Avatar,
    IconButton,
    Button,
    CardActions,
    styled,
    Stack,
    Menu,
    MenuItem
} from '@mui/material';

import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import Text from 'components/Text';
import { Delete, Info, ThumbDownAltTwoTone, ThumbUpAltTwoTone } from '@mui/icons-material';
import ReactTimeAgo from 'react-time-ago'
import React, { useState } from 'react';
import { actionUpdate } from "../service";
import VoteButton from 'components/buttons/VoteButtons';

const ActionType = {
    DISLIKE: 0,
    LIKE: 1
}
const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);

function Comment({ comment }) {
    const [paction, setPaction] = useState({
        up_vote: comment.up_vote,
        down_vote: comment.down_vote,
        vtype: comment.vtype
    });

    return (
        <Box mb={1}>
            <Card>
                <CardHeader
                    avatar={<Avatar src={comment.user_dp} />}
                    // action={
                    //     <>
                    //         {comment.userid === userModel._id ? (
                    //             <IconButton
                    //                 color="error"
                    //                 onClick={() => {
                    //                     handleOptionAction(2)
                    //                 }}
                    //             >
                    //                 <Delete fontSize="medium" />
                    //             </IconButton>
                    //         ) : (
                    //             <IconButton
                    //                 color="info"
                    //                 onClick={() => {
                    //                     handleOptionAction(i)
                    //                 }}
                    //             >
                    //                 <Info fontSize="medium" />
                    //             </IconButton>
                    //         )}

                    //     </>
                    // }
                    titleTypographyProps={{ variant: 'h5' }}
                    subheaderTypographyProps={{ variant: 'subtitle2' }}
                    title={comment.username}
                />
                <Box px={2} pb={1}>
                    <Typography variant="h5" fontWeight="normal">
                        {comment.comment}
                    </Typography>
                </Box>
                <Box px={2}>
                    <Typography variant="subtitle2">
                        <ReactTimeAgo date={new Date(comment.create_at)} locale="en-US" />
                    </Typography>
                </Box>
                <CardActionsWrapper
                    sx={{
                        display: { xs: 'block', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <Button disabled size='small' startIcon={<ThumbUpAltTwoTone />} variant={"outlined"}>
                            Like
                        </Button>
                        <Button disabled size='small' startIcon={<ThumbDownAltTwoTone />} variant={"outlined"}>
                            Dislike
                        </Button>
                    </Stack>
                    <Box sx={{ mt: { xs: 1, md: 0 } }}>
                        <Typography variant="subtitle2" component="span">
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

export default Comment;