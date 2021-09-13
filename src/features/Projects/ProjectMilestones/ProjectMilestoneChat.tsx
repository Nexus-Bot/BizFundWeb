import {
    Box,
    Paper,
    Typography,
    Divider,
    makeStyles,
    Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CommentIcon from "@material-ui/icons/Comment";
import Weavy from "src/weavy/Weavy";
import { Project, Milestone } from "../../../../types/modelTypes";
import WeavyApp from "../../../weavy/WeavyApp";

interface Props {
    project: Project | null;
    milestone: Milestone | null;
}

const useStyles = makeStyles((theme: Theme) => ({
    titleBG: {
        background:
            "repeating-linear-gradient(45deg,#27558d,#27558d 10px,#1d406a 10px,#1d406a 20px);",
    },
}));

const ProjectMilestoneChat = (props: Props) => {
    const [token, settoken] = useState<string | null>(null);
    useEffect(() => {
        const BFToken = localStorage.getItem("logInTokenBF");
        const PMToken = localStorage.getItem("logInTokenPM");
        if (BFToken) {
            settoken(BFToken);
        } else if (PMToken) {
            settoken(PMToken);
        }
    }, [token]);

    const classes = useStyles();
    return (
        <>
            {token && props.project && props.milestone && (
                <Box my="2rem">
                    <Paper variant="outlined">
                        {/* Heading */}
                        <Box
                            textAlign="center"
                            className={classes.titleBG}
                            color="#FFF"
                            py="1rem"
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CommentIcon fontSize="large" />
                                <Box ml="1rem">
                                    <Typography component="h1" variant="h5">
                                        <strong> Discussions </strong>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                        <Box my="2rem">
                            <Weavy jwt={token}>
                                <div>
                                    <WeavyApp
                                        spaceKey="oxylus-project-milestones-conversations"
                                        spaceName="Oxylus Project Milestones Conversations Space"
                                        appKey={
                                            props.project.id +
                                            props.milestone._id +
                                            "feeds"
                                        }
                                        appName={
                                            props.project.title +
                                            " " +
                                            props.milestone.title +
                                            " feeds"
                                        }
                                        appType="posts"
                                    />
                                </div>
                            </Weavy>
                        </Box>
                    </Paper>
                </Box>
            )}
        </>
    );
};

export default ProjectMilestoneChat;
