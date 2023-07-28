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
import {useLocation, useNavigate} from "react-router-dom";
import {RootState} from "../redux/store/store.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useKeycloak} from "@react-keycloak/web";
import {setUser, setUserDetails} from "../redux/actions/userActions.ts";
// import jwtDecode from 'jwt-decode';

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
    const [navItems, setNavItems] = React.useState<string[]>(['Home', 'About', 'Contact', 'login', 'logout']);
    const dispatch = useDispatch();


    //TODO: modificare sia il tempo di scadenza token su keycloak che il tempo di refresh di questo useEffect
    // Imposta un timeout per verificare la scadenza del token
    useEffect(() => {

            const minValidity = 15; // Secondi
            const refreshInterval = setInterval(() => {
                if (user.token) {
                    keycloak.updateToken(minValidity)
                        .then(refreshed => {
                            if (refreshed) {
                                dispatch(setUser({
                                    ...user,
                                    token: keycloak.token as string,
                                }))

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

            }, 10000); // Controlla ogni 10 secondi

            return () => clearInterval(refreshInterval); // Pulisce l'intervallo quando il componente viene smontato

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user.token]
    )
    ; // Dipendenza da keycloak


// Imposta i link del menu in base allo stato di autenticazione
// Imposta anche l'oggetto user nello store
    useEffect(() => {

        if (keycloak.authenticated) {

            setNavItems(['Home', 'Profilo', 'Logout']);
            keycloak.loadUserProfile()
                .then((profile) => {
                    dispatch(setUser({
                        email: profile.email ? profile.email : "",
                        firstName: profile.firstName ? profile.firstName : "",
                        lastName: profile.lastName ? profile.lastName : "",
                        token: keycloak.token as string,
                        xsrfToken: ""
                    }));

                    // console.log(keycloak.tokenParsed)
                    // const token = keycloak.token as string;
                    // const decodedToken = jwtDecode(token);
                });
        } else {
            setNavItems(['Home', 'About', 'Contact', 'Login'])
            dispatch(setUser({
                email: "",
                firstName: "",
                lastName: "",
                token: "",
                xsrfToken: ""
            }))

            dispatch(setUserDetails({
                accountEmail: "",
                firstName: "",
                lastName: "",
                telephoneNumber: "",
                createDt: "",
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated]);

    const customNavigation = (path: string) => {

        switch (path) {
            case 'Login':
                navigate('/secured_page')
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

    const locationConverter = (item: string) => {
        switch (item) {
            case 'Home':
                return '/';
            case 'Profilo':
                return '/secured_page';
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
                                textAlign: 'center',
                                color: location.pathname === locationConverter(item) ? '#fff' : 'var(--highlight)',
                            }}
                            color={location.pathname === locationConverter(item) ? 'primary' : 'inherit'}
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
                        {user.email ? user.email : 'Forestiero'}
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item}
                                    sx={{color: location.pathname != locationConverter(item) ? '#fff' : 'var(--highlight)',}}
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