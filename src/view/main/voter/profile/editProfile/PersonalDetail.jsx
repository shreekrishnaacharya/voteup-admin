import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider
} from '@mui/material';

import Text from 'components/Text';
import React from "react";

export default function PersonalDetail({ userProfile }) {
    return (<Card>
        <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box>
                <Typography variant="h4" gutterBottom>
                    Personal Details
                </Typography>
                <Typography variant="subtitle2">
                    Manage informations related to your personal details
                </Typography>
            </Box>
        </Box>
        <Divider />
        <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                            Name:
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                            <b>{userProfile.name}</b>
                        </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                            Gender:
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                            <b>{userProfile.gender}</b>
                        </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                            Date of birth:
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                            <b>{userProfile.dob}</b>
                        </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                            Contact:
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                            <b>{userProfile.contact}</b>
                        </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                            Address1:
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                            <b>{userProfile.address1}</b>
                        </Text>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                        <Box pr={3} pb={2}>
                            Address2:
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Text color="black">
                            <b>{userProfile.address2}</b>
                        </Text>
                    </Grid>
                </Grid>
            </Typography>
        </CardContent>
    </Card>)
}