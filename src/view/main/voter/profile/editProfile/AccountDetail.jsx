import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    Switch,
} from '@mui/material';
import Text from 'components/Text';
import React from "react";
import { getDateString } from '_services'
import { Temp } from '../../model/list'

export default function AccountDetail({ userProfile, updateProfile }) {
    const { Status, Kyc } = Temp
    const handleStatus = () => {
        updateProfile({ status: userProfile.statusCode == 1 ? 0 : 1 });
    }
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
                            <Kyc kyc={userProfile.kyc} sx={{
                                ml: 4,
                                ".MuiBadge-badge": {
                                    width: "70px"
                                }
                            }} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Account status:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <Status status={userProfile.status} sx={{ ml: 4 }} />
                            <Switch onClick={handleStatus} sx={{ ml: 5 }} {...(Boolean(userProfile.status) ? { defaultChecked: true } : {})} color={userProfile.statusCode == 1 ? 'success' : 'error'} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                            <Box pr={3} pb={2}>
                                Created On:
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                            <b>&nbsp;{getDateString(userProfile.create_at)}</b>
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </Card>)
}