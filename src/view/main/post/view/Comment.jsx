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
import { ThumbDownAltTwoTone, ThumbUpAltTwoTone } from '@mui/icons-material';
import ReactTimeAgo from 'react-time-ago'
import React, { useState } from 'react';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);

function Comment({ comment }) {

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
                        <ReactTimeAgo date={new Date(comment.create_at)} locale="en-US" />
                    </Typography>
                </Box>
                <CardActionsWrapper
                    sx={{
                        display: { xs: 'block', md: 'flex' },
                        alignItems: 'end',
                        justifyContent: 'end'
                    }}
                >
                    <Box sx={{ mt: { xs: 1, md: 0 } }}>
                        <Typography variant="subtitle2" component="span">
                            <Text color="success">
                                <b>{comment.votes}</b>
                            </Text>{' '}
                            Votes
                        </Typography>
                    </Box>
                </CardActionsWrapper>
            </Card>
        </Box >
    );
}

export default Comment;