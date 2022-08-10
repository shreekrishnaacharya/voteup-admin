import { Card, CardHeader, Skeleton, CardContent, styled, Box, Divider, CardActions, Stack, Button } from "@mui/material";
import { ThumbDownAltTwoTone, ThumbUpAltTwoTone } from '@mui/icons-material';

const CardActionsWrapper = styled(CardActions)(
    ({ theme }) => `
       background: ${theme.colors.alpha.black[5]};
       padding: ${theme.spacing(3)};
  `
);
export default function CommentLoad() {
    return <Box mb={1}>
        <Card>
            <CardHeader
                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                title={
                    <Skeleton
                        animation="wave"
                        height={20}
                        width="20%"
                        style={{ marginBottom: 6 }}
                    />
                }
            />
            <CardContent>
                <>
                    <Skeleton animation="wave" height={20} width="90%" style={{ marginTop: 6 }} />
                    <Skeleton animation="wave" height={20} width="70%" style={{ marginTop: 6 }} />
                </>
            </CardContent>
            <CardActionsWrapper
                sx={{
                    display: { xs: 'block', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Stack direction="row" spacing={0} justifyContent="space-between">
                    <Button disabled size='small' startIcon={<ThumbUpAltTwoTone />} variant={"outlined"}>
                        Like
                    </Button>
                    <Button disabled size='small' startIcon={<ThumbDownAltTwoTone />} variant={"outlined"}>
                        Dislike
                    </Button>
                </Stack>
            </CardActionsWrapper>
        </Card>
    </Box>
}