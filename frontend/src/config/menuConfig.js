// This file is used to configure which paths appear in the AppBar/DrawerForSmallScreens

const menuItems = [
  {
    label: 'Notes',
    path: '/notes',
    showInAppBar: true,
    showInDrawer: true,
    showSettingsIcon: true, 
  },
  {
    label: 'Contact',
    path: '/contact',
    showInAppBar: true,
    showInDrawer: true,
    showSettingsIcon: false,
  },
  {
    label: 'Privacy Policy',
    path: '/privacy_policy',
    showInAppBar: false,
    showInDrawer: true,
    showSettingsIcon: false,
  },
]

export default menuItems
