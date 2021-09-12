import { Box, Button, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import ReactGlobe from "react-globe";
import { Link } from "react-router-dom";
import HomePageBg from "../../Assets/HomePage/bg.png";

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
        background: `url(${HomePageBg}) center center /cover`,
    },
    getBtn: { padding: "1rem", color: "#FFF" },
}));

const LandingPage = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.Bg}>
            <Box display="flex" alignItems="center" p="2rem">
                <Box style={{ color: "#FFF" }} pl="6rem">
                    <Typography variant="h1">
                        <strong>OXYLUS</strong>
                    </Typography>
                    <Box my="1rem">
                        <Typography variant="h5">
                            Platform for Business Owners to contribute and
                            connect with SDG projects using blockchain as
                            backbone
                        </Typography>
                    </Box>
                    <Box mt="3rem">
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.getBtn}
                            component={Link}
                            to={"/getstarted"}
                        >
                            <Typography variant="h5">
                                <strong>Get Started</strong>
                            </Typography>
                        </Button>
                    </Box>
                </Box>

                <Box p="2rem" m="1rem">
                    <ReactGlobe
                        height="80vh"
                        width="50vw"
                        globeBackgroundTexture={null}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default LandingPage;
