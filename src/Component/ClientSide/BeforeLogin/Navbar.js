import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeColor = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

const drawerWidth = 240;
const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About Us', path: '/about' },
];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <img src="./Images/BeforeLogin/logo.png" alt="Logo" style={{ width: '120px', margin: '20px auto' }} />
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/login" sx={{ textAlign: 'center' }}>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/pricing" sx={{ textAlign: 'center' }}>
                        <ListItemText primary="SignUp" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <ThemeProvider theme={ThemeColor}>
                    <AppBar component="nav" sx={{ backgroundColor: 'whiteSmoke', height: '90px', color: 'black', justifyContent: 'center' }}>
                        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {/* Left Side: Menu Icon for Mobile */}
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            {/* Centered Logo in Mobile View */}
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                <img src="./Images/BeforeLogin/logo.png" alt="Logo" style={{ height: '60px' }} />
                            </Box>

                            {/* Navigation Links for Larger Screens */}
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {navItems.map((item) => (
                                    <Button key={item.label} component={Link} to={item.path} sx={{ color: '#6c757d', fontSize: '16px', fontWeight: '600', mx: '5px' }} variant="text">
                                        {item.label}
                                    </Button>
                                ))}
                                <Button component={Link} to="/login" sx={{ mx: '15px' }} variant="outlined">Log in</Button>
                                <Button className='signupButton' component={Link} to="/pricing" variant="contained">Sign up</Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>

                {/* Mobile Navigation Drawer */}
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>

            <style>
                {`
                .signupButton:hover {
                    background-color: #1976d2;
                    color: white;
                }
                `}
            </style>
        </>
    );
}

Navbar.propTypes = {
    window: PropTypes.func,
};

export default Navbar;
