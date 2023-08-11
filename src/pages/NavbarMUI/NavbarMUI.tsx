import * as React from 'react';
import './style.css';
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
import {useLocation, useNavigate} from "react-router-dom";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useKeycloak} from "@react-keycloak/web";
import {GET_SET_UserDetails, setUser, setUserDetails} from "../../redux/actions/userActions.ts";

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
    const location = useLocation();
    const user = useSelector((state: RootState) => state.STORE1.user);
    const [navItems, setNavItems] = React.useState<string[]>([]);
    const dispatch: AppDispatch = useDispatch();

    const logout_ = () => {
        console.log("logout_")
        const sessionStorageKeys = ['http://127.0.0.1:5173/', 'http://localhost8180/'];
        const localStorageKeys = ['http://127.0.0.1:5173/', 'http://localhost8180/'];
        const cookieKeys = ['http://127.0.0.1:5173/', 'http://localhost8180/'];

        // Per cancellare dati specifici in sessionStorage
        sessionStorageKeys.forEach(key => {
            sessionStorage.removeItem(key);
        });

        // Per cancellare dati specifici in localStorage
        localStorageKeys.forEach(key => {
            localStorage.removeItem(key);
        });

        // Per cancellare cookie specifici
        cookieKeys.forEach(key => {
            document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        });

        dispatch(setUser({
            email: "",
            firstName: "",
            lastName: "",
            xsrfToken: ""
        }))

        dispatch(setUserDetails({
            accountEmail: "",
            firstName: "",
            lastName: "",
            telephoneNumber: "",
            createDt: "",
        }))

        keycloak.logout();
    }


    useEffect(() => {
        console.log("authenticato: " + keycloak.authenticated)

        // Eseguiamo la nostra funzione per fare il fetch dei dati
        if (keycloak.authenticated) {
            keycloak.loadUserProfile().then((profile) => {
                    dispatch(setUser({
                        email: profile.email ? profile.email : "",
                        firstName: profile.firstName ? profile.firstName : "",
                        lastName: profile.lastName ? profile.lastName : "",
                        xsrfToken: ""
                    }));
                    dispatch(GET_SET_UserDetails(profile.email, keycloak.token as string))
                    setNavItems(['Home', 'Teams', 'Profilo', 'Logout'])
                }
            )
        } else {
            setNavItems(['Home', 'Login'])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated]);

    // Imposta un timeout per verificare la scadenza del token
    useEffect(() => {
            if (keycloak.authenticated) console.log(keycloak.token as string)

            const minValidity = 5 * 60; // Secondi
            const refreshInterval = setInterval(() => {
                if (keycloak.authenticated) {
                    console.log("Checking token validity")

                    keycloak.updateToken(minValidity)
                        .then(refreshed => {
                            if (refreshed) {
                                console.log("Token refreshed")
                            } else {
                                // Il token era ancora valido, non era necessario rinnovare
                                console.log("Token not refreshed, still valid")
                            }
                        })
                        .catch(() => {
                            // Errore durante il tentativo di rinnovo del token, potrebbe essere necessario gestire il logout qui
                            keycloak.logout();
                            console.log("Failed to refresh the token, or the session has expired")
                        });
                }

            }, 60000); // Controlla ogni minuto

            return () => clearInterval(refreshInterval); // Pulisce l'intervallo quando il componente viene smontato

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [keycloak.authenticated]
    )

    const customNavigation = (path: string) => {

        switch (path) {
            case 'Login':
                keycloak.login();
                break;

            case 'Logout':
                logout_()
                break;

            case 'Home':
                navigate('/');
                break;

            case 'Profilo':
                navigate('/profile');
                break;

            case 'Teams':
                navigate('/teams');
                break;

            default:
                navigate('/');
                break;
        }
    }

    const locationConverter = (item: string) => {

        if (item === 'Teams' && location.pathname.startsWith('/teams')) {
            return true
        } else if (item === 'Profilo' && location.pathname.startsWith('/profile')) {
            return true
        } else if (item === 'Home' && location.pathname === '/') {
            return true
        }

        return false
    }


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center', backgroundColor: '#283b48', height: '100%'}}>
            <Typography variant="h6" sx={{my: 2, color: '#fff'}}>
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
                                textAlign: 'center',
                                color: '#A8D8A8',
                                borderBottom: !locationConverter(item) ? 'none' : '2px solid #A8D8A8',
                                borderRadius: '0px',
                            }}
                            color={!locationConverter(item) ? 'primary' : 'inherit'}
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
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar id={'dvlpz_app_bar'} component="nav">
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
                        {user.firstName ? user.firstName : 'Ospite'}
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item}
                                    sx={{
                                        color: '#A8D8A8',
                                        borderBottom: !locationConverter(item) ? 'none' : '2px solid #A8D8A8',
                                        borderRadius: '0px',
                                    }}
                                    onClick={() => customNavigation(item)}>
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