import PropTypes from 'prop-types';
import { Card, CardHeader, Skeleton, CardContent, styled, Box, Divider, CardActions, Stack, Button } from "@mui/material";
import { CommentTwoTone, ShareTwoTone, ThumbUpAltTwoTone } from '@mui/icons-material';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);
function PostLoad({ isOpen }) {
    return <Box mb={2}>
        <Card>
            <CardHeader
                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                title={
                    <Skeleton
                        animation="wave"
                        height={20}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={20} width="40%" />
                }
            />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={20} width="90%" style={{ marginTop: 6 }} />
                    <Skeleton animation="wave" height={20} width="50%" />
                </>
            </CardContent>
            <Divider />
            <CardActionsWrapper
                sx={{
                    display: { xs: 'block', md: 'flex' },
                    alignItems: 'center',
                    py: 1.5,
                    justifyContent: 'space-between'
                }}

            >
                <Stack direction="row" spacing={1} justifyContent="space-between">
                    {isOpen ? (
                        <Button disabled startIcon={<ThumbUpAltTwoTone />} variant={"outlined"}>
                            Vote
                        </Button>
                    ) : (
                        <Button disabled startIcon={<CommentTwoTone />} variant="outlined">
                            View
                        </Button>
                    )}
                    <Button disabled startIcon={<ShareTwoTone />} variant="outlined">
                        Share
                    </Button>
                </Stack>
            </CardActionsWrapper>
        </Card>
    </Box>
}

PostLoad.defaultProps = {
    isOpen: false,
}

export default PostLoad;