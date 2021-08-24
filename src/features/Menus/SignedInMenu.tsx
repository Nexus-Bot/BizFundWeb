import { Box, Grid, Hidden, IconButton, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import MenuButton from "../Navbar/MenuButton";
import SettingsIcon from "@material-ui/icons/Settings";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import { Switch as SwitchButton } from "@material-ui/core";
import MenuWithLogOut from "../Navbar/MenuWithLogOut";
import MainButton from "../Buttons/MainButton";
import SideDrawer from "./SideDrawer";
import type { BizFundraiser, ProjectMaker } from "../../../types/modelTypes";

interface Props {
    auth: {
        authenticated: boolean;
        currentUser: ProjectMaker | BizFundraiser | null;
    };
}

const SignedInMenu = ({ auth }: Props) => {
    const drawerList = () => {
        const firstMenuItemsForPM = [
            {
                name: "Create Project",
                link: "/createproject",
                type: "Link",
            },
            {
                name: "Browse Projects",
                link: "/projects",
                type: "Link",
            },
            {
                name: "My Projects",
                link: "/createproject",
                type: "Link",
            },
        ];

        const firstMenuItemsForBF = [
            {
                name: "Browse Projects",
                link: "/projects",
                type: "Link",
            },
        ];

        return (
            <Fragment>
                {/* Notification */}
                <div>
                    <Grid container alignItems="center" direction="row">
                        <IconButton
                            color="inherit"
                            // classes={props.classes.IconButton}
                        >
                            <NotificationsNoneRoundedIcon fontSize="small" />

                            <Hidden mdUp>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    ml="1.1rem"
                                >
                                    <Typography variant="body2">
                                        Notifications
                                    </Typography>
                                </Box>
                            </Hidden>
                        </IconButton>
                    </Grid>
                </div>

                {/* First Menu */}
                <MenuButton
                    iconType={AddRoundedIcon}
                    items={
                        auth.currentUser?.isBizFundRaiser
                            ? firstMenuItemsForBF
                            : firstMenuItemsForPM
                    }
                    menuName="Projects"
                />

                {/* Account Menu */}
                <MenuButton
                    iconType={SettingsIcon}
                    items={[
                        {
                            name: "Basic Details",
                            link: "/settings/basic",
                            type: "Link",
                        },
                        {
                            name: "About Me",
                            link: "/settings/about",
                            type: "Link",
                        },
                        {
                            name: "Account",
                            link: "/settings/account",
                            type: "Link",
                        },
                    ]}
                    menuName="Settings"
                />

                {/* Projects Menu */}
                <MenuWithLogOut />
            </Fragment>
        );
    };

    return (
        <Fragment>
            {auth.currentUser?.isBizFundRaiser ? (
                <MainButton
                    buttonTitle="Create Project"
                    link="/createproject"
                />
            ) : (
                <MainButton buttonTitle="Browse Projects" link="/projects" />
            )}

            {/* <FormControlLabel
                control={
                    <SwitchButton
                        onClick={this.props.toggleDarkMode}
                        color="secondary"
                        size="small"
                    />
                }
                style={{ marginLeft: "0.2rem" }}
            /> */}
            <Hidden smDown>{drawerList()}</Hidden>
            <Hidden mdUp>
                <SideDrawer drawerList={drawerList} />
            </Hidden>
        </Fragment>
    );
};

export default SignedInMenu;
