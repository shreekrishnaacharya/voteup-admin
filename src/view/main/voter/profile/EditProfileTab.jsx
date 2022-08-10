import {
  Grid
} from '@mui/material';

import React from "react";
import UserStory from './editProfile/UserStory';
import PersonalDetail from './editProfile/PersonalDetail';
import AccountDetail from './editProfile/AccountDetail';


function EditProfileTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UserStory />
      </Grid>
      <Grid item xs={12}>
        <PersonalDetail />
      </Grid>
      <Grid item xs={12}>
        <AccountDetail />
      </Grid>
    </Grid >
  );
}

export default EditProfileTab;
