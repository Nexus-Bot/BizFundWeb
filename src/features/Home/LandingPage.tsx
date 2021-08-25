import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import HomePageBg from "../../Assets/HomePage/BGImage.jpg";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
    "@global": {
        html: {
            fontSize: ".8rem",
        },
    },
    root: {},
    Bg: {
        position: "absolute",
        height: "100%",
        width: "100%",
        background: `url(${HomePageBg}) no-repeat 50% 65% /cover`,
    },
    getBtnPos: {
        position: "absolute",
        bottom: "5rem",
        right: "5rem",
    },
    getBtn: { padding: "1rem", color: "#FFF" },
}));

const LandingPage = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.Bg}>
            <Box className={classes.getBtnPos}>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.getBtn}
                    component={Link}
                    to={"/getstarted"}
                >
                    <Typography variant="h5">Get Started</Typography>
                </Button>
            </Box>
        </div>
    );
};

export default LandingPage;
