import {
    Paper,
    Typography,
    Box,
    Grid,
    Button,
    CircularProgress,
    IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import RequestDetails from "./RequestDetails";
import RequestVoting from "./RequestVoting";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { cancelRequest } from "../../../App/Util/reusableFunctions/updateProjectData";
import { Link } from "react-router-dom";
import AttachFileIcon from "@material-ui/icons/AttachFile";

interface Props {
    request: Request | null;
    user: BizFundraiser | ProjectMaker | null;
    project: Project | null;
}

const ProjectMilestoneRequestListItem = ({ request, user, project }: Props) => {
    const [cancelLoading, setcanceLLoading] = useState<boolean>(false);
    const onClickCancelRequest = async () => {
        setcanceLLoading(true);

        await cancelRequest(project?.id, request?.id, "reason");

        setcanceLLoading(false);
    };

    return (
        <Box my="1rem" width="100%">
            <Paper elevation={3}>
                <Box p="2rem">
                    <Box py="2rem" display="flex" justifyContent="space-around">
                        <Box display="flex" alignItems="center">
                            {request?.isComplete && (
                                <CheckCircleIcon
                                    style={{ color: "#329932" }}
                                    fontSize="large"
                                />
                            )}
                            {request?.cancelled && (
                                <CancelIcon
                                    style={{ color: "#FF3232" }}
                                    fontSize="large"
                                />
                            )}
                            {!request?.cancelled && !request?.isComplete && (
                                <HourglassEmptyIcon
                                    style={{ color: "#FFDA3E" }}
                                    fontSize="large"
                                />
                            )}
                            <Typography variant="h4">
                                {request?.title}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            {!project?.cancelled &&
                                !project?.finished &&
                                user &&
                                user.isProjectMaker &&
                                user.metamaskAddress ===
                                    project?.creatorMetamaskAddress && (
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{
                                                backgroundColor: "#FF3232",
                                                color: "#FFF",
                                            }}
                                            onClick={onClickCancelRequest}
                                        >
                                            {!cancelLoading && (
                                                <span>Cancel Request</span>
                                            )}
                                            {cancelLoading && (
                                                <CircularProgress
                                                    color="inherit"
                                                    size="2rem"
                                                />
                                            )}
                                        </Button>
                                    </Box>
                                )}
                            {!project?.cancelled &&
                                !project?.finished &&
                                user?.isProjectMaker &&
                                user?.metamaskAddress ===
                                    project?.creatorMetamaskAddress && (
                                    <Box>
                                        <IconButton
                                            component={Link}
                                            to={`/setFiles/${request?.filesURL}`}
                                        >
                                            <AttachFileIcon />
                                        </IconButton>
                                    </Box>
                                )}
                        </Box>
                    </Box>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <RequestDetails request={request} />
                        </Grid>
                        <Grid item>
                            <RequestVoting
                                request={request}
                                project={project}
                                user={user}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default ProjectMilestoneRequestListItem;
