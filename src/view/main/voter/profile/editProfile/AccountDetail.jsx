import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
} from '@mui/material';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Label from 'components/Label';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Text from 'components/Text';
import React from "react";

export default function AccountDetail({ userProfile }) {
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
                        Account Details
                    </Typography>
                    <Typography variant="subtitle2">
                        Details related to your account
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Email:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                                <b>{userProfile.email}</b>
                            </Text>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Password:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Text color="black">
                                <b>*****************</b>
                            </Text>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                KYC:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {userProfile.kyc == "Verified" ? (
                                <Label color="success">
                                    <DoneTwoToneIcon fontSize="small" />
                                    <b>&nbsp;{userProfile.kyc}</b>
                                </Label>
                            ) : (
                                <Label color="warning">
                                    <ReportProblemIcon fontSize="small" />
                                    <b>&nbsp;{userProfile.kyc}</b>
                                </Label>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Account status:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            {userProfile.status == "Active" ? (
                                <Label color="success">
                                    <DoneTwoToneIcon fontSize="small" />
                                    <b>&nbsp;{userProfile.status}</b>
                                </Label>
                            ) : (
                                <Label color="warning">
                                    <ReportProblemIcon fontSize="small" />
                                    <b>&nbsp;{userProfile.status}</b>
                                </Label>
                            )}
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>)
}