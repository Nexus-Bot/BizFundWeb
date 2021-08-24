import {
    AppBar,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../redux/store/store";
import SignedInMenu from "../Menus/SignedInMenu";
import SignedOutMenu from "../Menus/SignedOutMenu";
import mainLogo from "../../Assets/Logo.svg";

interface Props extends PropsFromRedux {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
    },
    title: {
        flexGrow: 1,
        marginLeft: 10,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    logo: {
        maxWidth: 60,
    },
    margin: {
        marginLeft: 20,
    },
    typo: {
        color: "inherit",
        textDecoration: "none",
        "@media (max-width:960px)": {
            fontSize: "1.5rem",
        },
        "@media (max-width:355px)": {
            fontSize: "1rem",
        },
    },
}));

const Navbar = ({ auth }: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.root} id="back-to-top-anchor">
            <AppBar style={{ background: "#2E3B55" }}>
                <Toolbar>
                    {/* Logo */}
                    <Link to="/projects">
                        <img
                            src={mainLogo}
                            alt="Logo"
                            className={classes.logo}
                        />
                    </Link>
                    <Typography
                        // type="title"
                        variant="h6"
                        color="inherit"
                        className={(classes.flex, classes.title)}
                    >
                        <Link to="/projects" className={classes.typo}>
                            BizFund
                        </Link>
                    </Typography>

                    {auth.authenticated ? (
                        <SignedInMenu
                            auth={auth}
                            // classes={classes}
                            // toggleDarkMode={toggleDarkMode}
                        />
                    ) : (
                        <SignedOutMenu
                        // onClick={() =>
                        //     this.setState({ authenticated: true })
                        // }
                        />
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapState2Props = (state: RootState) => {
    return { auth: state.auth };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
