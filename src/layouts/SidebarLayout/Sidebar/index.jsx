import Scrollbar from 'components/Scrollbar';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  SwipeableDrawer
} from '@mui/material';

import SidebarMenu from './SidebarMenu';
import Logo from 'components/Logo';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMiniSideNav } from 'redux/action/menuAction';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 6;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const menuState = useSelector(state => state.menu.miniSidenav);
  const dispatch = useDispatch();
  const theme = useTheme();
  const closeSidebar = () => {
    dispatch(setMiniSideNav(!menuState))
  }
  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          background:
            theme.palette.mode === 'dark'
              ? alpha(lighten(theme.header.background, 0.1), 0.5)
              : darken(theme.colors.alpha.black[100], 0.5),
          boxShadow:
            theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <SidebarMenu />
        </Scrollbar>
      </SidebarWrapper>
      <SwipeableDrawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={'left'}
        open={menuState}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </SwipeableDrawer>
    </>
  );
}

export default Sidebar;
