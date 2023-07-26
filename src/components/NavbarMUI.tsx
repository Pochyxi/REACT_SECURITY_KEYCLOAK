import * as React from 'react';
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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {RootState} from "../redux/store/store.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useKeycloak} from "@react-keycloak/web";
import {setUser} from "../redux/actions/UserActions.ts";
import jwtDecode from 'jwt-decode';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window,
}

const drawerWidth = 240;

function NavbarMUI(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {keycloak} = useKeycloak();

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.STORE1.user);
    const [navItems, setNavItems] = React.useState<string[]>(['Home', 'About', 'Contact', 'login', 'logout']);
    const dispatch = useDispatch();

    useEffect(() => {

        if (keycloak.authenticated) {
            setNavItems(['Home', 'Profilo', 'Logout']);
            keycloak.loadUserProfile()
                .then((profile) => {
                    dispatch(setUser({
                        email: profile.email,
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        token: keycloak.token as string,
                        xsrfToken: ""
                    }));
                    // console.log(keycloak.tokenParsed)
                    const token = keycloak.token as string;
                    const decodedToken = jwtDecode(token);
                    console.log(decodedToken)
                });
        } else {
            setNavItems(['Home', 'About', 'Contact', 'Login'])
            dispatch(setUser({
                email: "Forestiero",
                firstName: "",
                lastName: "",
                token: "",
                xsrfToken: ""
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated]);

    const customNavigation = (path: string) => {

        switch (path) {
            case 'Login':
                keycloak.login()
                break;

            case 'Logout':
                keycloak.logout();
                break;


            case 'Home':
                navigate('/');
                break;

            case 'Profilo':
                navigate('/secured_page');
                break;

            case 'Contact':
                navigate('/contact');
                break;


            default:
                navigate('/');
                break;
        }
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                {user.firstName} {user.lastName}
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem
                        key={item}
                        disablePadding>
                        <ListItemButton
                            sx={{
                                textAlign: 'center'
                            }}
                            onClick={() => customNavigation(item)}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex', marginBottom: '100px'}}>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {user.email}
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{color: '#fff'}} onClick={() => customNavigation(item)}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default NavbarMUI;