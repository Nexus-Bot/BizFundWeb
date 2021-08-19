import {
    Box,
    Button,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    makeStyles,
    Paper,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import HttpIcon from "@material-ui/icons/Http";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import GetAppIcon from "@material-ui/icons/GetApp";
import type { Project } from "../../../../types/modelTypes";
import useAsyncEffect from "use-async-effect";
import Mapbox from "../../../features/Maps/Mapbox";

interface Props {
    project: Project;
}

const useStyles = makeStyles((theme: Theme) => ({
    btn: {
        marginLeft: "0.3rem",
        marginRight: "0.3rem",
    },
    dib: {
        display: "inline-block",
    },
    map: {
        height: "40vh",
        width: "90%",
        margin: "auto",
    },
}));

const getFilesOfProject = async (projectFolerURL: string) => {
    // Call the API to get files
};

const ProjectDetailedInfo = ({ project }: Props) => {
    const [openMap, setopenMap] = useState<boolean>(false);
    const [projectFiles, setprojectFiles] = useState<any>([]);

    useAsyncEffect(
        async (isMounted) => {
            const files = await getFilesOfProject(project.folderURL);

            if (!isMounted()) return;

            setprojectFiles(files);
        },
        [project.folderURL]
    );

    const handleMapBtnClick = () => {
        setopenMap(!openMap);
    };

    const classes = useStyles();
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <InfoOutlinedIcon color="disabled" />
                </ListItemIcon>
                <Typography
                    variant="body1"
                    color="textPrimary"
                    component={"div"}
                >
                    Description of the project
                    <Typography variant="body2" color="textSecondary">
                        {project.description}
                    </Typography>
                </Typography>
            </ListItem>
            <Divider />

            {/* <ListItem>
                <ListItemIcon>
                    <CategoryOutlinedIcon color="disabled" />
                </ListItemIcon>
                <Typography
                    variant="body1"
                    color="textPrimary"
                    component={"div"}
                >
                    {event.category}
                </Typography>
            </ListItem> */}

            {projectFiles && projectFiles.length > 0 && (
                <div>
                    <Divider />

                    <ListItem>
                        <ListItemIcon>
                            <CloudDownloadIcon color="disabled" />
                        </ListItemIcon>
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            component={"div"}
                        >
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                component={"div"}
                            >
                                Downloads
                                {projectFiles &&
                                    projectFiles.map(
                                        (file: any, index: any) => (
                                            <Box
                                                key={file.id}
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {index + 1}.
                                                    {file.name.length > 20
                                                        ? file.name.substr(
                                                              0,
                                                              20
                                                          ) + "..."
                                                        : file.name}
                                                </Typography>
                                                <IconButton>
                                                    <a href={file.url}>
                                                        <GetAppIcon color="secondary" />
                                                    </a>
                                                </IconButton>
                                            </Box>
                                        )
                                    )}
                            </Typography>
                        </Typography>
                    </ListItem>
                </div>
            )}

            <Divider />
            <ListItem>
                <ListItemIcon>
                    <LocationOnOutlinedIcon color="disabled" />
                </ListItemIcon>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                >
                    <Box style={{ width: "50%" }}>
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            component={"div"}
                        >
                            Event Venue
                            {project.location.isMap && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {project.location.placeName}
                                </Typography>
                            )}
                            {!project.location.isMap && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {project.location.addressLine1}
                                    <br />
                                    {project.location.addressLine2}
                                </Typography>
                            )}
                        </Typography>
                    </Box>
                    {project.location.isMap && (
                        <Box>
                            <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                onClick={handleMapBtnClick}
                                className={classes.btn}
                            >
                                {!openMap ? "View Map" : "Hide Map"}
                            </Button>
                        </Box>
                    )}
                </Box>
            </ListItem>
            <Collapse in={openMap} timeout="auto" unmountOnExit>
                <Box className={classes.map}>
                    <Paper
                        elevation={3}
                        style={{ height: "100%", width: "100%" }}
                    >
                        {project.location.isMap && (
                            <Mapbox
                                lng={project.location.lng}
                                lat={project.location.lat}
                                zoom={12}
                            />
                        )}
                    </Paper>
                </Box>
            </Collapse>
        </List>
    );
};

export default ProjectDetailedInfo;
