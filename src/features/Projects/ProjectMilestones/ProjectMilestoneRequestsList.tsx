import {
    Box,
    Button,
    List,
    ListItem,
    makeStyles,
    Paper,
    Typography,
    Theme,
} from "@material-ui/core";
import React from "react";
import indigo from "@material-ui/core/colors/indigo";
import type {
    BizFundraiser,
    Milestone,
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
    milestone: Milestone | null;
}

const useStyles = makeStyles((theme: Theme) => ({
    titleBG: {
        background:
            "repeating-linear-gradient(45deg,#206c34,#206c34 10px,#174724 10px,#174724 20px);",
    },
}));

const ProjectMilestoneRequestsList = ({
    requests,
    user,
    project,
    milestone,
}: Props) => {
    const classes = useStyles();
    return (
        <Paper variant="outlined" elevation={3}>
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
                                <strong> Requests </strong>
                            </Typography>
                        </Box>
                    </Box>
                    {!project?.cancelled &&
                        !project?.finished &&
                        user &&
                        user.isProjectMaker &&
                        user.metamaskAddress ===
                            project?.creatorMetamaskAddress && (
                            <Box>
                                <Button
                                    component={Link}
                                    variant="contained"
                                    color="secondary"
                                    to={`/projects/${project?.id}/${milestone?._id}/createrequest`}
                                >
                                    Create Request
                                </Button>
                            </Box>
                        )}
                </Box>
            </Box>
            {requests && requests.length > 0 && (
                <List>
                    {requests?.map((request, index) => {
                        return (
                            <ListItem
                                key={index}
                                style={{ backgroundColor: "#333" }}
                            >
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
