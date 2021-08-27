import {
    Box,
    Button,
    Grid,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import GoalsImage from "../../Assets/HomePage/goals.jpg";

const useStyles = makeStyles((theme: Theme) => ({
    "@global": {
        html: {
            fontSize: ".8rem",
        },
    },
    root: {
        position: "absolute",
        height: "100%",
        width: "100%",
        // padding: "3rem 0",
        textAlign: "center",
        backgroundColor: "#000",
    },
    sideBg: {
        height: 0,
        paddingTop: "100%",
        background: `url(${GoalsImage}) no-repeat 50% 50% /cover`,
    },
    getBtnPos: {
        position: "absolute",
        bottom: "4rem",
        right: "4rem",
    },
    getBtn: { padding: "1rem", color: "#FFF" },
}));

interface Props {}

const GettingStartedPage = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
            >
                <Grid item xs={7} style={{ height: "100%" }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        height="100%"
                    >
                        <Box>
                            <Typography variant="h3" style={{ color: "#FFF" }}>
                                <strong>
                                    <span style={{ color: "#cc0000" }}>
                                        Together
                                    </span>{" "}
                                    We Can
                                </strong>
                            </Typography>
                        </Box>
                        <Box display="flex">
                            <Box p="1rem" m="1rem">
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <Box m="1rem">
                                        <Typography
                                            variant="h4"
                                            style={{ color: "#FFF" }}
                                        >
                                            <strong>For Businesses</strong>
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            style={{ color: "#FFF" }}
                                        >
                                            Make a step forward and unite
                                            together show your love
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.getBtn}
                                        component={Link}
                                        to={"/home/bizfundraiser"}
                                    >
                                        Sign Up / Log In
                                    </Button>
                                </Box>
                            </Box>
                            <Box p="1rem" m="1rem">
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                >
                                    <Box m="1rem">
                                        <Typography
                                            variant="h4"
                                            style={{ color: "#FFF" }}
                                        >
                                            <strong> For Project Makers</strong>
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            style={{ color: "#FFF" }}
                                        >
                                            Make a step forward and unite
                                            together show your love
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.getBtn}
                                        component={Link}
                                        to={"/home/projectmaker"}
                                    >
                                        Sign Up / Log In
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <div className={classes.sideBg}></div>
                </Grid>
            </Grid>
        </div>
    );
};

export default GettingStartedPage;
