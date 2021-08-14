import React from "react";
import {
    AppBar,
    Tabs,
    Paper,
    Tab,
    makeStyles,
    Theme,
    useTheme,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import SignInBizFundraiserPanel from "./SignInBizFundraiserPanel";
import SignUpBizFundraiserPanel from "./SignUpBizFundraiserPanel";
import TabPanel from "./TabPanel";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const a11yProps = (index: number) => {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
};

const AuthenticationBizFundraiserPanel = (props: Props): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Paper>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Sign Up" {...a11yProps(0)} />
                        <Tab label="Log In" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                >
                    <TabPanel value={value} index={0}>
                        <SignUpBizFundraiserPanel handleChange={handleChange} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignInBizFundraiserPanel handleChange={handleChange} />
                    </TabPanel>
                </SwipeableViews>
            </Paper>
        </div>
    );
};

export default AuthenticationBizFundraiserPanel;
