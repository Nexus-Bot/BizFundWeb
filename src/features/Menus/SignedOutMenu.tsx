import { Box, Grid, Hidden, IconButton, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import MainButton from "../Buttons/MainButton";
import MenuButton from "../Navbar/MenuButton";
import SideDrawer from "./SideDrawer";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";

interface Props {}

const SignedOutMenu = (props: Props) => {
    const drawerList = () => {
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
                    items={[
                        {
                            name: "Browse Projects",
                            link: "/projects",
                            type: "Link",
                        },
                    ]}
                    menuName="Projects"
                />
            </Fragment>
        );
    };
    return (
        <Fragment>
            <MainButton buttonTitle="Browse Projects" link="/projects" />
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

export default SignedOutMenu;
