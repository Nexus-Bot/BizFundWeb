import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
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
import useAsyncEffect from "use-async-effect/types";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { Link } from "react-router-dom";

interface Props {
    project: Project;
    user: BizFundraiser | ProjectMaker | null;
}

const ProjectDetailedMilestones = ({ project, user }: Props) => {
    const [milestones, setMilestones] = useState<Milestone[]>([]);

    useAsyncEffect(async (isMounted) => {
        // Fetch milestones

        if (!isMounted()) return;

        // Set milestones
    });

    return (
        <div>
            {milestones.length > 0 && (
                <List>
                    {milestones.map((milestone, index) => {
                        return (
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
                                    user.metamuskAddress ===
                                        project.creatorMetamuskAddress && (
                                        <ListItemSecondaryAction>
                                            <Link
                                                to={`/project/${project.id}/milestones/${milestone.id}`}
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
                        );
                    })}
                </List>
            )}
        </div>
    );
};

export default ProjectDetailedMilestones;
