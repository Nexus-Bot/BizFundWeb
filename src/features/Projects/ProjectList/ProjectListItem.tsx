import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import type { Project, ProjectMaker } from "../../../../types/modelTypes";
import noImage from "../../../Assets/noImage.svg";
import useAsyncEffect from "use-async-effect";
import { getProjectMakerDataByMetamaskAddress } from "../../..//App/Util/reusableFunctions/getProjectMakerData";

interface Props {
    project: Project;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: "15rem",
        maxWidth: "50rem",
        padding: "1rem",
        margin: "1rem",
    },

    pos: {
        marginBottom: "1.5rem",
        marginLeft: "1rem",
    },

    heading: {
        fontSize: "1.1rem",
        marginLeft: "1rem",
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
        margin: "0.7rem",
        borderRadius: "0.7rem",
        marginBottom: "1rem",
    },
    large: {
        height: "4.5rem",
        width: "4.5rem",
    },
    linksPri: {
        textDecoration: "none",
        color: "#f50057",
    },
}));

const ProjectListItem = ({ project }: Props) => {
    const handleShare = (project: Project, url: string) => {
        // const { event, openModal } = this.props;
        // openModal("SocialShareModal", {
        // 	event: event,
        // 	url: window.location.href,
        // });
    };

    const [projectMaker, setProjectMaker] = useState<ProjectMaker | null>(null);

    useAsyncEffect(async (isMounted) => {
        const user = await getProjectMakerDataByMetamaskAddress(
            project.creatorMetamaskAddress
        );

        if (!isMounted()) return;

        if (user) setProjectMaker(user);
    }, []);

    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            {/* Project Image */}
            <Grid item md xs={12}>
                <CardMedia
                    className={classes.media}
                    image={project.imgURL || noImage}
                    title="image name"
                ></CardMedia>
            </Grid>
            <Grid container spacing={1}>
                {/* Project Details */}

                <Grid item md>
                    <CardContent>
                        <Grid
                            container
                            direction="column"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box display="flex" alignItems="center">
                                    <Box>
                                        <Link
                                            to={`/profile/${projectMaker?._id}`}
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={projectMaker?.photoURL}
                                                className={classes.large}
                                            />
                                        </Link>
                                    </Box>
                                    <Box ml="1rem">
                                        <Typography
                                            variant="body1"
                                            color="textPrimary"
                                        >
                                            <strong>{project.title}</strong>
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            Organized by{" "}
                                            <strong>
                                                <Link
                                                    to={`/profile/${projectMaker?._id}`}
                                                    className={classes.linksPri}
                                                >
                                                    {" "}
                                                    {projectMaker?.displayName}
                                                </Link>
                                            </strong>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Box>
                                {/* Current Milestone of the project */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    my="0.5rem"
                                >
                                    <ScheduleIcon fontSize="small" />

                                    <Box mx="0.5rem">
                                        <Typography color="textSecondary">
                                            {/* Enter some relevant information here about milestones */}
                                            Some info about milestones
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                {/* Location of the project */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    my="0.5rem"
                                >
                                    <RoomIcon fontSize="small" />
                                    {!project.isMap && (
                                        <Box mx="0.5rem">
                                            <Typography color="textSecondary">
                                                {project.postalAddress}
                                            </Typography>
                                        </Box>
                                    )}
                                    {project.isMap && (
                                        <Box mx="0.5rem">
                                            <Typography color="textSecondary">
                                                {project.placeName}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                        <Typography variant="body2" component="p">
                            {project.description}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>

            {/* project Action Buttons */}
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={() => handleShare(project, window.location.href)}
                >
                    <ShareIcon />
                </IconButton>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={`/projects/${project.id}`}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProjectListItem;
