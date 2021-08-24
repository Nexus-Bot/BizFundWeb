import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    CircularProgress,
    IconButton,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import type { Project, ProjectMaker } from "../../../../types/modelTypes";
import { deepOrange } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import noImage from "../../../Assets/noImage.svg";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import type { RootState } from "src/redux/store/store";
import { connect, ConnectedProps } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: "1rem",
        marginBottom: "1rem",
        //backgroundColor: "#F5F5F5",
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

interface Props extends PropsFromRedux {
    project: Project;
    isProjectMaker: boolean;
    contribution: number | null;
    loading: boolean;
    projectMaker: ProjectMaker | null;
}

interface Photo {
    url: string;
    title: string;
}

const ProjectDetailedHeader = ({
    project,
    contribution,
    isProjectMaker,
    loading,
    projectMaker,
}: Props) => {
    const classes = useStyles();

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
                title={project.title}
                // subheader={`${
                //     event.date &&
                //     format(event.date.toDate(), "EEEE do, LLL, yyyy")
                // } at ${format(event.date.toDate(), "h:mm a")}`}
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
                    {!isProjectMaker && (
                        <Box>
                            {contribution && (
                                <Box display="flex" alignItems="center">
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        icon={<AttachMoneyIcon />}
                                        label={`Current Contribution : ${contribution}`}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        className={classes.btn}
                                        onClick={() => {
                                            // Add more fund function
                                        }}
                                    >
                                        {!loading && <span>Pay More</span>}
                                        {loading && (
                                            <CircularProgress
                                                color="inherit"
                                                size="2rem"
                                            />
                                        )}
                                    </Button>
                                </Box>
                            )}
                            {!contribution && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className={classes.btn}
                                    onClick={() => {
                                        // Pay for the project first time function
                                    }}
                                >
                                    {!loading && <span>Pay for Good</span>}
                                    {loading && (
                                        <CircularProgress
                                            color="inherit"
                                            size="2rem"
                                        />
                                    )}
                                </Button>
                            )}
                        </Box>
                    )}
                    {isProjectMaker && (
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                className={classes.btn}
                                component={Link}
                                to={`/manage/${project.id}`}
                            >
                                Manage
                            </Button>
                        </Box>
                    )}

                    {isProjectMaker && (
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                className={classes.btn}
                                component={Link}
                                to={`/setPhoto/${project.id}`}
                            >
                                Set Photo
                            </Button>
                            <Link to={`/setFiles/${project.id}`}>
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

const mapState2Props = (state: RootState) => {
    return {
        loading: state.async.loading,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProjectDetailedHeader);
