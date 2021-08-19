import {
    Avatar,
    Box,
    makeStyles,
    Paper,
    Typography,
    Theme,
} from "@material-ui/core";
import React from "react";
import type { Milestone, Project } from "../../../../types/modelTypes";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

interface Props {
    project: Project | null;
    milestone: Milestone | null;
}

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        height: "5rem",
        width: "5rem",
    },
}));

const ProjectMilestoneHeader = ({ project, milestone }: Props) => {
    const classes = useStyles();
    return (
        <Box my="1rem">
            <Paper elevation={3}>
                <Box display="flex" p="1rem" alignItems="center">
                    <Avatar className={classes.avatar}>
                        {milestone?.isCompleted && <CheckCircleIcon />}
                        {milestone?.isCancelled && <CancelIcon />}
                        {!milestone?.isCancelled && !milestone?.isCompleted && (
                            <HourglassEmptyIcon />
                        )}
                    </Avatar>
                    <Box>
                        <Box mb="0.5rem">
                            <Typography component="h1" variant="h5">
                                {milestone?.title}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="textSecondary">
                            {milestone?.description}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Project : {project?.title}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProjectMilestoneHeader;
