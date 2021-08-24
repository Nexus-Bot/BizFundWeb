import {
    Box,
    Button,
    List,
    ListItem,
    Paper,
    Typography,
} from "@material-ui/core";
import React from "react";
import indigo from "@material-ui/core/colors/indigo";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { Link } from "react-router-dom";
import ProjectMilestoneRequestListItem from "./ProjectMilestoneRequestListItem";

interface Props {
    requests: Request[] | null;
    user: BizFundraiser | ProjectMaker | null;
    project: Project | null;
}

const ProjectMilestoneRequestsList = ({ requests, user, project }: Props) => {
    return (
        <Paper variant="outlined" elevation={3}>
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
                        <Typography component="h1" variant="h3">
                            Requests
                        </Typography>
                    </Box>
                    {user &&
                        user.isProjectMaker &&
                        user.metamaskAddress ===
                            project?.creatorMetamaskAddress && (
                            <Box>
                                <Link
                                    to={`/projects/${project?.id}/createrequest`}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Create Request
                                    </Button>
                                </Link>
                            </Box>
                        )}
                </Box>
            </Box>
            {requests && requests.length > 0 && (
                <List>
                    {requests?.map((request, index) => {
                        return (
                            <ListItem key={index}>
                                <ProjectMilestoneRequestListItem
                                    request={request}
                                    project={project}
                                    user={user}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Paper>
    );
};

export default ProjectMilestoneRequestsList;
