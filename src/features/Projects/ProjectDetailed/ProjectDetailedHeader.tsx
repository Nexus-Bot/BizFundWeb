import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    makeStyles,
    Theme,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import type { Project, ProjectMaker } from "../../../../types/modelTypes";
import { deepOrange } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import noImage from "../../../Assets/noImage.svg";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {
    cancelProject,
    finishProject,
} from "../../../App/Util/reusableFunctions/updateProjectData";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
        cursor: "pointer",
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    btn: {
        marginLeft: "0.3rem",
        marginRight: "0.3rem",
    },
    linksSec: {
        textDecoration: "none",
        color: "#f50057",
    },
}));

const openImageOnFullScreen = (photo: Photo) => {
    // const { openModal } = this.props;
    // openModal("ImageModal", { photo });
};

interface Photo {
    url: string;
    title: string;
}

interface Props {
    project: Project;
    isProjectMaker: boolean;
    projectMaker: ProjectMaker | null;
}

interface ComponentState {
    cancelProjectLoading: boolean;
    finishProjectLoading: boolean;
}

const ProjectDetailedHeader = ({
    project,
    isProjectMaker,
    projectMaker,
}: Props) => {
    const [state, setState] = useState<ComponentState>({
        cancelProjectLoading: false,
        finishProjectLoading: false,
    });
    const classes = useStyles();

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const onClickCancelProject = async () => {
        setState({ ...state, cancelProjectLoading: true });

        await delay(5000);
        await cancelProject(project.id, "reason");
        setState({ ...state, cancelProjectLoading: false });
    };

    const onClickFinishProject = async () => {
        setState({ ...state, finishProjectLoading: true });

        await delay(5000);
        await finishProject(project.id);
        setState({ ...state, finishProjectLoading: false });
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Link to={`/profile/${projectMaker?._id}`}>
                        <Avatar
                            alt="Host Name"
                            src={projectMaker?.photoURL}
                            className={classes.avatar}
                        ></Avatar>
                    </Link>
                }
                title={
                    <Typography variant="h4">
                        <strong>{project.title}</strong>
                    </Typography>
                }
            />
            <CardMedia
                className={classes.media}
                image={project.imgURL || noImage}
                title="Image Title"
                onClick={() =>
                    openImageOnFullScreen({
                        url: project.imgURL,
                        title: project.title,
                    })
                }
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Organized By{" "}
                    <strong>
                        <Link
                            to={`/profile/${projectMaker?._id}`}
                            className={classes.linksSec}
                        >
                            {projectMaker?.displayName}
                        </Link>
                    </strong>
                </Typography>
                <Box display="flex" justifyContent="space-between" mt="0.5rem">
                    {isProjectMaker && (
                        <Box display="flex" alignItems="center">
                            <Box mx="0.5rem">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    className={classes.btn}
                                    onClick={onClickCancelProject}
                                >
                                    {!state.cancelProjectLoading && (
                                        <span>Cancel Project</span>
                                    )}
                                    {state.cancelProjectLoading && (
                                        <CircularProgress
                                            color="inherit"
                                            size="2rem"
                                        />
                                    )}
                                </Button>
                            </Box>
                            <Box mx="0.5rem">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    className={classes.btn}
                                    onClick={onClickFinishProject}
                                >
                                    {!state.finishProjectLoading && (
                                        <span>Finish Project</span>
                                    )}
                                    {state.finishProjectLoading && (
                                        <CircularProgress
                                            color="inherit"
                                            size="2rem"
                                        />
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {!project.cancelled && !project.finished && isProjectMaker && (
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                className={classes.btn}
                                component={Link}
                                to={`/setPhoto/${project.id}`}
                            >
                                Set Photo
                            </Button>
                            <Link to={`/setFiles/${project.folderURL}`}>
                                <IconButton>
                                    <AttachFileIcon />
                                </IconButton>
                            </Link>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProjectDetailedHeader;
