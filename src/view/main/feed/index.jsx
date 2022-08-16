import Feed from "./view/Feed";
import { Box } from "@mui/material";

function FeedController() {
    return (
        <Box pb={15} color={"text.primary"}>
            <Feed userModel={null} feedType={'feeds'} />
        </Box>
    );
}

export default FeedController;