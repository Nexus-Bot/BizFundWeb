import { Box, Paper, Typography, Divider } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import CommentIcon from "@material-ui/icons/Comment";
import { Project, Milestone } from "../../../../types/modelTypes";

interface Props {
    project: Project | null;
    milestone: Milestone | null;
}

const ProjectMilestoneChat = (props: Props) => {
    return (
        <>
            {props.project && props.milestone && (
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
                        <Box my="2rem">Milestone Discussion Section</Box>
                    </Paper>
                </Box>
            )}
        </>
    );
};

export default ProjectMilestoneChat;
