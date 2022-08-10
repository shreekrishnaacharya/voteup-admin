import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function PopularTags() {
  const theme = useTheme();

  return (
    <Card sx={{ height: 'auto' }}>
      <CardHeader title="Your Tags" />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            padding: 1.2,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary="#HTML" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            padding: 1.2,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary="#software_development" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            padding: 1.2,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary="#TrendingInfuencers" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            padding: 1.2,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
        >
          <ListItemText primary="#investorsWatch2022" />
        </ListItem>
      </ListWrapper>
    </Card>
  );
}

export default PopularTags;
