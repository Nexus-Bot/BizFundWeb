import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    Typography,
    Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import type {
    BizFundraiser,
    Milestone,
    Project,
    ProjectMaker,
} from "../../../../types/modelTypes";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import useAsyncEffect from "use-async-effect";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { Link } from "react-router-dom";
import { getMilestonesForProject } from "../../../App/Util/reusableFunctions/getProjectData";

interface Props {
    project: Project;
    user: BizFundraiser | ProjectMaker | null;
}

const useStyles = makeStyles((theme: Theme) => ({
    titleBG: {
        background:
            "repeating-linear-gradient(45deg,#206c34,#206c34 10px,#174724 10px,#174724 20px);",
    },
}));

const ProjectDetailedMilestones = ({ project, user }: Props) => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);

    useAsyncEffect(async (isMounted) => {
        // Fetch milestones
        const milestonesData = await getMilestonesForProject(project.id);

        if (!isMounted()) return;

        // Set milestones
        if (milestonesData) setMilestones(milestonesData);
    }, []);

    const classes = useStyles();
    return (
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
                    justifyContent="space-around"
                >
                    <Box display="flex" alignItems="center">
                        <FormatListNumberedIcon fontSize="large" />
                        <Box ml="1rem">
                            <Typography component="h1" variant="h5">
                                <strong> Milestones</strong>
                            </Typography>
                        </Box>
                    </Box>
                    {!project.cancelled &&
                        !project.finished &&
                        user &&
                        user.isProjectMaker &&
                        user.metamaskAddress ===
                            project.creatorMetamaskAddress && (
                            <Box>
                                <Button
                                    component={Link}
                                    variant="contained"
                                    color="secondary"
                                    to={`/projects/${project.id}/createmilestones`}
                                >
                                    Create Milestone
                                </Button>
                            </Box>
                        )}
                </Box>
            </Box>
            {milestones.length > 0 && (
                <List>
                    {milestones.map((milestone, index) => {
                        return (
                            <ListItem
                                button
                                key={index}
                                component={Link}
                                to={`/project/${project.id}/milestones/${milestone._id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        {milestone.isCompleted && (
                                            <CheckCircleIcon
                                                style={{ color: "#329932" }}
                                            />
                                        )}
                                        {milestone.isCancelled && (
                                            <CancelIcon
                                                style={{ color: "#FF3232" }}
                                            />
                                        )}
                                        {!milestone.isCancelled &&
                                            !milestone.isCompleted && (
                                                <HourglassEmptyIcon
                                                    style={{ color: "#FFDA3E" }}
                                                />
                                            )}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${
                                        milestone.milestoneIndex + 1
                                    }. ${milestone.title}`}
                                    secondary={
                                        milestone.description.slice(0, 15) +
                                        "..."
                                    }
                                />
                                {!project.cancelled &&
                                    !project.finished &&
                                    user &&
                                    user.isProjectMaker &&
                                    user.metamaskAddress ===
                                        project.creatorMetamaskAddress && (
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                component={Link}
                                                to={`/projects/${project.id}/editmilestone/${milestone._id}`}
                                                edge="end"
                                                aria-label="end"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Paper>
    );
};

export default ProjectDetailedMilestones;
