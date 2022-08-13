import Feed from "./view/Feed";
import { Box } from "@mui/material";

function FeedController() {
    return (
        <Box p={3} pb={15} color={"text.primary"}>
            <Feed userModel={null} feedType={'feeds'} />
        </Box>
    );
}

export default FeedController;