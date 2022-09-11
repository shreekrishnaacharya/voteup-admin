import {
  Grid
} from '@mui/material';

import React from "react";
import UserStory from './editProfile/UserStory';
import PersonalDetail from './editProfile/PersonalDetail';
import AccountDetail from './editProfile/AccountDetail';


function EditProfileTab({ userProfile, updateProfile }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UserStory userProfile={userProfile} />
      </Grid>
      <Grid item xs={12}>
        <PersonalDetail userProfile={userProfile} />
      </Grid>
      <Grid item xs={12}>
        <AccountDetail userProfile={userProfile} updateProfile={updateProfile} />
      </Grid>
    </Grid >
  );
}

export default EditProfileTab;
