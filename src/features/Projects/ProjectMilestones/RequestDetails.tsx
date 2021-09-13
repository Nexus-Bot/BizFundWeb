import {
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    makeStyles,
    Typography,
    Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import type { Request } from "../../../../types/modelTypes";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import useAsyncEffect from "use-async-effect";
import { getFilesFromDB } from "../../../App/Util/reusableFunctions/getProjectData";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import GetAppIcon from "@material-ui/icons/GetApp";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ETHLogo from "../../../Assets/ethereum.png";

interface Props {
    request: Request | null;
}

type Files = any | null;

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        maxWidth: "3.5rem",
    },
    chip: {
        minHeight: "4rem",
        background:
            "linear-gradient(138deg, rgba(10,39,12,1) 0%, rgba(57,210,98,1) 42%, rgba(59,131,218,1) 80%)",
    },
}));

const RequestDetails = ({ request }: Props) => {
    const [files, setFiles] = useState<Files>(null);

    useAsyncEffect(async (isMounted) => {
        const filesData = await getFilesFromDB(request?.filesURL);

        if (!isMounted()) return;

        setFiles(filesData);
    }, []);

    const classes = useStyles();
    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <InfoOutlinedIcon color="disabled" fontSize="large" />
                </ListItemIcon>
                <Typography variant="h6" color="textPrimary" component={"div"}>
                    Description of the request
                    <Typography variant="body2" color="textSecondary">
                        {request?.description}
                    </Typography>
                </Typography>
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>
                    <AttachMoneyIcon color="disabled" fontSize="large" />
                </ListItemIcon>
                <Typography variant="h6" color="textPrimary" component={"div"}>
                    Amount required for the request
                    <Box py="0.5rem">
                        <Chip
                            label={
                                <Box display="flex" alignItems="center">
                                    <Box>{request?.value} </Box>
                                    <Box pt="0.5rem">
                                        <img
                                            src={ETHLogo}
                                            alt="Logo"
                                            className={classes.logo}
                                        />
                                    </Box>
                                </Box>
                            }
                            variant="outlined"
                            className={classes.chip}
                            icon={<MonetizationOnIcon />}
                        />
                    </Box>
                </Typography>
            </ListItem>

            <Divider />
            <ListItem>
                <ListItemIcon>
                    <AttachMoneyIcon color="disabled" fontSize="large" />
                </ListItemIcon>
                <Typography variant="h6" color="textPrimary" component={"div"}>
                    Vendor Information
                    <Typography variant="body2" color="textSecondary">
                        Wallet Address : {request?.vendorMetamaskAddress}
                    </Typography>
                </Typography>
            </ListItem>

            {files && files.length > 0 && (
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
                                {files &&
                                    files.map((file: any, index: number) => (
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
                                                    ? file.name.substr(0, 20) +
                                                      "..."
                                                    : file.name}
                                            </Typography>
                                            <IconButton>
                                                <a href={file.url}>
                                                    <GetAppIcon color="secondary" />
                                                </a>
                                            </IconButton>
                                        </Box>
                                    ))}
                            </Typography>
                        </Typography>
                    </ListItem>
                </div>
            )}
        </List>
    );
};

export default RequestDetails;
