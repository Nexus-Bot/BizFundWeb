import {
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    Typography,
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

interface Props {
    request: Request | null;
}

type Files = any | null;

const RequestDetails = ({ request }: Props) => {
    const [files, setFiles] = useState<Files>(null);

    useAsyncEffect(async (isMounted) => {
        const filesData = await getFilesFromDB(request?.filesURL);

        if (!isMounted()) return;

        setFiles(filesData);
    }, []);

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
                                <Typography variant="h6" color="textSecondary">
                                    {request?.value} ETH
                                </Typography>
                            }
                            variant="outlined"
                            color="secondary"
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
