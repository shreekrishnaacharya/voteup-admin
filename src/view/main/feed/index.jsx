import Feed from "./view/Feed";
import Rightbar from "./view/Rightbar";
import { Box, Stack } from "@mui/material";
import Add from "./view/Add";
import tokenService from "_services/token.service";

function FeedController() {
    const userModel = tokenService.getUser();
    return (
        <Box p={3} pb={15} color={"text.primary"}>
            <Stack direction="row" spacing={2} gap={2} justifyContent="space-between">
                <Feed userModel={userModel} feedType={'feeds'} />
                <Rightbar tokenService={tokenService} />
            </Stack>
            <Add userModel={userModel} />
        </Box>
    );
}

export default FeedController;