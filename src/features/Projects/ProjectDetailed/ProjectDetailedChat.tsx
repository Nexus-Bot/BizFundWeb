import {
    Box,
    Paper,
    Typography,
    Divider,
    makeStyles,
    Theme,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import { Project } from "../../../../types/modelTypes";

interface Props {
    project: Project;
}

const useStyles = makeStyles((theme: Theme) => ({
    titleBG: {
        background:
            "repeating-linear-gradient(45deg,#27558d,#27558d 10px,#1d406a 10px,#1d406a 20px);",
    },
}));

const ProjectDetailedChat = (props: Props) => {
    const classes = useStyles();
    return (
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
                <Box my="2rem">Project Discussion Section</Box>
            </Paper>
        </Box>
    );
};

export default ProjectDetailedChat;
