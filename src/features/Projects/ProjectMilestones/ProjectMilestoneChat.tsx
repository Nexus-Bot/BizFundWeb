import { Box, Paper, Typography, Divider } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import CommentIcon from "@material-ui/icons/Comment";
import React, { useEffect, useState } from "react";
import Weavy from "src/weavy/Weavy";
import { Project, Milestone } from "../../../../types/modelTypes";
import WeavyApp from "../../../weavy/WeavyApp";

interface Props {
    project: Project | null;
    milestone: Milestone | null;
}

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

    return (
        <>
            {token && props.project && props.milestone && (
                <Box my="2rem">
                    <Paper variant="outlined">
                        {/* Heading */}
                        <Box
                            textAlign="center"
                            bgcolor={indigo["500"]}
                            color="#FFF"
                            py="1rem"
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <CommentIcon fontSize="large" />
                                <Typography component="h1" variant="h5">
                                    Discussions
                                </Typography>
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
