import {
    Box,
    makeStyles,
    Typography,
    Theme,
    Container,
} from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RootState } from "src/redux/store/store";
import AuthenticationProjectMakerPanel from "../Panels/AuthenticationProjectMakerPanel";
import BG from "../../Assets/ProjectMakerHomepage.jpg";

interface Props extends PropsFromRedux {}

const useStyles = makeStyles((theme: Theme) => ({
    bg: {
        background: `url(${BG}) center center /cover`,
    },
}));

const HomePageProjectMaker = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <div className={classes.bg}>
            <Container
                maxWidth="lg"
                style={{
                    paddingTop: "5rem",
                    paddingBottom: "5rem",
                }}
            >
                <Box p="3rem" mt="2rem">
                    <Box
                        m="1rem"
                        p="1rem"
                        width="500px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                    >
                        <Box
                            mb="1rem"
                            textAlign="center"
                            style={{
                                backgroundColor: "#333",
                                borderRadius: "2rem",
                                padding: "0.5rem",
                            }}
                        >
                            <Typography variant="h3" color="secondary">
                                <strong>Project Makers</strong>
                            </Typography>
                        </Box>
                        <AuthenticationProjectMakerPanel />
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentUser,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePageProjectMaker);
