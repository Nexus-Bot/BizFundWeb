import {
    makeStyles,
    Typography,
    Theme,
    Box,
    Grid,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/reducers/authReducer";
import type { RootState } from "../../redux/store/store";
import type { BizFundraiser, ProjectMaker } from "types/modelTypes";

const useStyles = makeStyles((theme: Theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: 7,
    },
}));

const sampleProfile = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    displayName: "",
    photoURL: "",
    metamuskAddress: "",
};

interface Props extends PropsFromRedux {}

const MenuWithLogOut = (props: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Call the logout API
        // Call the redux logout action
    };

    const BtnText = (text: string) => {
        return (
            <Typography variant="body2" color="inherit">
                {text}
            </Typography>
        );
    };

    const open = Boolean(anchorEl);

    const { profile } = props;
    const classes = useStyles();

    return (
        <Box>
            <Grid container direction="row" alignItems="center">
                <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Avatar
                        alt={profile.displayName ? profile.displayName : ""}
                        src={profile.photoURL}
                        className={classes.small}
                    />
                    {profile.displayName && BtnText(profile.displayName)}
                </IconButton>
            </Grid>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
                open={open}
                keepMounted
                getContentAnchorEl={null}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={`/profile/${profile.id}`}
                >
                    Profile
                </MenuItem>
                <Divider light />

                <MenuItem onClick={handleClose} component={Link} to="/projects">
                    Help
                </MenuItem>
                <Divider light />

                <MenuItem component={Link} to="/" onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

const mapState2Props = (state: RootState) => {
    const prop: { profile: BizFundraiser | ProjectMaker } = {
        profile: sampleProfile,
    };
    if (state.auth.currentBizFundraiser) {
        prop.profile = state.auth.currentBizFundraiser;
    } else if (state.auth.currentProjectMaker) {
        prop.profile = state.auth.currentProjectMaker;
    }

    return prop;
};

const mapDispatch2Props = {
    logOutUser: logoutUser,
};

const connector = connect(mapState2Props, mapDispatch2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MenuWithLogOut);
