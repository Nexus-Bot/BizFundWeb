import {
    Box,
    Paper,
    Typography,
    Divider,
    makeStyles,
    Theme,
} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import CommentIcon from "@material-ui/icons/Comment";
import { Project, Milestone } from "../../../../types/modelTypes";

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
    const classes = useStyles();

    return (
        <>
            {props.project && props.milestone && (
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
                        <Box my="2rem">Milestone Discussion Section</Box>
                    </Paper>
                </Box>
            )}
        </>
    );
};

export default ProjectMilestoneChat;
