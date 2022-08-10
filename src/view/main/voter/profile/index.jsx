import ProfileCover from './ProfileCover';
import PopularTags from './PopularTags';
import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../service';
import EditProfileTab from './EditProfileTab';
import { Link } from 'react-router-dom'
import { Container, Tabs, Tab, Grid, styled, Button } from '@mui/material';
import { pages } from 'links';
import Feed from 'view/main/feed/view/Feed';
import tokenService from "_services/token.service";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "redux/action/profileAction";
import { useSnackbar } from 'notistack';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserProfile() {
  const [currentTab, setCurrentTab] = useState('activity');
  const userProfile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const userModel = tokenService.getUser();
  const tabs = [
    { value: 'activity', label: 'Post' },
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'populat_tags', label: 'Tags' }
  ];
  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  useEffect(() => {
    getProfile().then((e) => {
      if (e.flag) {
        dispatch(setProfile(e.data))
      }
    })
  }, [])

  const saveImage = (fdata, closeModel) => {
    updateProfile(fdata).then(e => {
      if (e.flag) {
        enqueueSnackbar("Updated success", {
          variant: 'success',
        });
        dispatch(setProfile({ ...userProfile, ...e.data }))
        closeModel()
      }
    })
  }

  return (
    <>
      
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ProfileCover user={userProfile} saveImage={saveImage} />
          </Grid>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              indicator={true}
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
              <Link to={pages.HOME}><Button>Home</Button></Link>
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'activity' && <Feed userModel={userModel} feedType={'profile'} />}
            {currentTab === 'edit_profile' && <EditProfileTab userProfile={userProfile} />}
            {currentTab === 'populat_tags' && <PopularTags />}
          </Grid>
        </Grid>
    </>
  );
}

export default ManagementUserProfile;
