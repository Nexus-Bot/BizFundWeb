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
import type { RootState } from "../../redux/store/store";
import type { BizFundraiser, ProjectMaker } from "types/modelTypes";
import { logoutBizFundraiser } from "../../redux/actions/AuthenticationActions/logoutBizFundraiser";
import { logoutProjectMaker } from "../../redux/actions/AuthenticationActions/logoutProjectMaker";

const useStyles = makeStyles((theme: Theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: 7,
    },
}));

interface Props extends PropsFromRedux {}

const MenuWithLogOut = ({ logOutPM, logOutBF, user }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const BFToken = localStorage.getItem("logInTokenBF");
        const PMToken = localStorage.getItem("logInTokenPM");
        if (user?.isBizFundRaiser && BFToken) {
            logOutBF(BFToken);
            localStorage.removeItem("logInTokenBF");
        } else if (user?.isProjectMaker && PMToken) {
            logOutPM(PMToken);
            localStorage.removeItem("logInTokenPM");
        }
    };

    const BtnText = (text: string) => {
        return (
            <Typography variant="body2" color="inherit">
                {text}
            </Typography>
        );
    };

    const open = Boolean(anchorEl);
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
                        alt={user?.displayName ? user.displayName : ""}
                        src={user?.photoURL}
                        className={classes.small}
                    />
                    {user?.displayName && BtnText(user?.displayName)}
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
                    to={`/profile/${user?._id}`}
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
    return {
        user: state.auth.currentUser,
    };
};

const mapDispatch2Props = {
    logOutPM: logoutProjectMaker,
    logOutBF: logoutBizFundraiser,
};

const connector = connect(mapState2Props, mapDispatch2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MenuWithLogOut);
