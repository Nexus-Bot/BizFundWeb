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
    Paper,
    Typography,
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
import indigo from "@material-ui/core/colors/indigo";

interface Props {
    project: Project;
    user: BizFundraiser | ProjectMaker | null;
}

// const testMilestoneData: Milestone[] = [
//     {
//         id: "test",
//         projectId: "test",
//         creator: ProjectMaker,
//         milestoneIndex: 1,
//         title: "test",
//         description: "test",
//         isCompleted: false,
//         isCancelled: false,
//         requestIds: [],
//     },
// ];

const ProjectDetailedMilestones = ({ project, user }: Props) => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);

    useAsyncEffect(async (isMounted) => {
        // Fetch milestones

        if (!isMounted()) return;

        // Set milestones
    });

    return (
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
                    justifyContent="space-around"
                >
                    <Box>
                        <FormatListNumberedIcon fontSize="large" />
                        <Typography component="h1" variant="h5">
                            Milestones
                        </Typography>
                    </Box>
                    {user &&
                        user.isProjectMaker &&
                        user.metamaskAddress ===
                            project.creatorMetamaskAddress && (
                            <Box>
                                <Link
                                    to={`/projects/${project.id}/createmilestones`}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Create Milestone
                                    </Button>
                                </Link>
                            </Box>
                        )}
                </Box>
            </Box>
            {milestones.length > 0 && (
                <List>
                    {milestones.map((milestone, index) => {
                        return (
                            <Link
                                to={`/project/${project.id}/milestones/${milestone._id}`}
                            >
                                <ListItem button key={index}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {milestone.isCompleted && (
                                                <CheckCircleIcon />
                                            )}
                                            {milestone.isCancelled && (
                                                <CancelIcon />
                                            )}
                                            {!milestone.isCancelled &&
                                                !milestone.isCompleted && (
                                                    <HourglassEmptyIcon />
                                                )}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={milestone.title}
                                        secondary={
                                            milestone.description.slice(0, 15) +
                                            "..."
                                        }
                                    />
                                    {user &&
                                        user.isProjectMaker &&
                                        user.metamaskAddress ===
                                            project.creatorMetamaskAddress && (
                                            <ListItemSecondaryAction>
                                                <Link
                                                    to={`/projects/${project.id}/editmilestone/${milestone._id}`}
                                                >
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="end"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                            </ListItemSecondaryAction>
                                        )}
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            )}
        </Paper>
    );
};

export default ProjectDetailedMilestones;
