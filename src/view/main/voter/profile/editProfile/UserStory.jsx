import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
} from '@mui/material';

import Text from 'components/Text';
import React from "react";


export default function UserStory({ userProfile }) {
    const { mystory } = userProfile
    return (
        <Card>
            <Box
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box>
                    <Typography variant="h4" gutterBottom>
                        My Story
                    </Typography>
                    <Typography variant="subtitle2">
                        Manage story that showcase on your profile
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Story:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                                <b>{mystory}</b>
                            </Text>
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>)
}