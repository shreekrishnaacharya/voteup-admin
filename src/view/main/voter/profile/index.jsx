import ProfileCover from './ProfileCover';
import PopularTags from './PopularTags';
import { useState, useEffect } from 'react';
import { getVoterUpdate, getVoterView } from '../service';
import EditProfileTab from './EditProfileTab';
import { Container, Tabs, Tab, Grid, styled, Button } from '@mui/material';
import { pages } from 'links';
import Feed from 'view/main/feed/view/Feed';
import { useLocation } from 'react-router-dom';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`);

function ManagementUserProfile() {
  const [currentTab, setCurrentTab] = useState('edit_profile');
  const [userProfile, setProfile] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id'), name = params.get('name');
  const tabs = [
    { value: 'activity', label: 'Post' },
    { value: 'edit_profile', label: 'Profile Detail' },
    { value: 'populat_tags', label: 'Tags' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  const loadProfile = () => {
    getVoterView(id).then((e) => {
      if (e.flag) {
        setProfile(e.data)
      }
    })
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const updateProfile = (data) => {
    return getVoterUpdate(id, data).then(e => {
      if (e.flag) {
        loadProfile()
      }
      return e
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
          <ProfileCover user={userProfile} />
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
          </TabsWrapper>
        </Grid>
        <Grid item xs={12}>
          {userProfile === null ? (
            "Loading"
          ) : (
            <>
              {currentTab === 'edit_profile' && <EditProfileTab userProfile={userProfile} updateProfile={updateProfile} />}
              {currentTab === 'activity' && <Feed userModel={userProfile} feedType={'profile'} />}
              {currentTab === 'populat_tags' && <PopularTags />}
            </>
          )
          }
        </Grid>
      </Grid>
    </>
  );
}

export default ManagementUserProfile;
