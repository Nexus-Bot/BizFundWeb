import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import type { RouteComponentProps } from "react-router";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import history from "../../../history";
import { fireabaseStorage } from "../../../App/Util/API/firebase";
import FileInput from "../../../App/Util/FormInputs/FileInput";
import { Controller, useForm } from "react-hook-form";
import useAsyncEffect from "use-async-effect";
import {
    ref,
    uploadBytesResumable,
    listAll,
    deleteObject,
} from "firebase/storage";

interface OwnProps extends RouteComponentProps<any> {}
interface ComponentState {
    files: any[];
    previousFiles: any[];
    loading: boolean;
    uploadedFiles: string[];
}

const Files = (props: OwnProps) => {
    const [state, setState] = useState<ComponentState>({
        files: [],
        previousFiles: [],
        loading: false,
        uploadedFiles: [],
    });

    const onFormSubmit = (data: any) => {
        console.log(data);
        handleUploadFiles(data.files);
    };

    const setList = (files: any) => {
        setState({ ...state, files: files });
    };

    useAsyncEffect(async (isMounted) => {
        const storageId = props.match.params.storageId;

        const storageRef = ref(fireabaseStorage, `${storageId}/Docs`);

        const files = await listAll(storageRef);

        if (!isMounted()) return;
        if (files) setState({ ...state, previousFiles: files.items });
    }, []);

    useEffect(() => {
        if (
            state.files.length === state.uploadedFiles.length &&
            state.files.length !== 0
        ) {
            history.goBack();
            // toastr.success("Success!!! ", "Your files have been uploaded");
        }
    }, [state.files, state.uploadedFiles]);

    const handleUploadFiles = (files: any) => {
        const storgeId = props.match.params.storageId;

        files.forEach((file: any) => {
            const uploadFileTask = uploadFileToFirebaseStorage(file, file.name);
            setState({ ...state, loading: true });
            let task = uploadFileTask.on(
                "state_changed",
                (snapshot: any) => {
                    // const progress =
                    // 	(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error: any) => {
                    // toastr.error(
                    //     "Oops",
                    //     "Something went wrong. Please retry / Check your internet connection"
                    // );
                },
                async () => {
                    try {
                        setState({
                            ...state,
                            uploadedFiles: [...state.uploadedFiles, file.name],
                        });
                        task();
                    } catch (error) {
                        // toastr.error(
                        //     "Oops",
                        //     "Something went wrong. Please retry / Check your internet connection"
                        // );
                    }
                }
            );
        });
    };

    const uploadFileToFirebaseStorage = (file: File, fileName: string) => {
        const storageId = props.match.params.storageId;

        const storageRef = ref(
            fireabaseStorage,
            `${storageId}/Docs/${fileName}`
        );

        return uploadBytesResumable(storageRef, file);
    };

    const handleDeleteFile = async (file: any) => {
        const storageId = props.match.params.storageId;

        const storageRef = ref(
            fireabaseStorage,
            `${storageId}/Docs/${file.name}`
        );

        setState({
            ...state,
            previousFiles: state.previousFiles.filter(
                (item: any) => item.name !== file.name
            ),
        });

        await deleteObject(storageRef);
        // const { openModal, eventId, deleteFileInEvent } = this.props;
        // openModal("AlertModal", {
        // 	title: `Delete ${file.name} ?`,
        // 	description:
        // 		"Deleting this file will remove it completely from your account",
        // 	agreeBtnText: "Delete",
        // 	disagreeBtnText: "Cancel",
        // 	actionName: "Deleting File",
        // 	action: () => {
        // 		deleteFileInEvent(file, eventId);
        // 		this.setState({
        // 			previousFiles: this.state.previousFiles.filter(
        // 				(item) => item.name !== file.name
        // 			),
        // 		});
        // 	},
        // });
    };

    const { handleSubmit, control, setValue } = useForm<any>({
        mode: "onChange",
    });

    const storgeId = props.match.params.storageId;
    const { files, loading, previousFiles, uploadedFiles } = state;

    return (
        <Box textAlign="center" my="2rem">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Controller
                        name="files"
                        control={control}
                        render={({ field }) => (
                            <FileInput
                                {...field}
                                setValue={setValue}
                                setList={setList}
                                fileTypes={".pdf"}
                            />
                        )}
                    />

                    <Box
                        my="1rem"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box mx="0.5rem">
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                disabled={state.files.length === 0}
                            >
                                Submit
                            </Button>
                        </Box>
                        <Box mx="0.5rem">
                            <Button
                                variant="contained"
                                type="button"
                                color="secondary"
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </form>

            <Box>
                {previousFiles.length > 0 && (
                    <>
                        <Typography variant="body1" color="textPrimary">
                            Previous Files
                        </Typography>
                        <List>
                            {previousFiles.map((file: any) => (
                                <ListItem key={file.name}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <InsertDriveFileIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography color="textPrimary">
                                                {file.name.length > 20
                                                    ? file.name.substr(0, 20) +
                                                      "..."
                                                    : file.name}
                                            </Typography>
                                        }
                                    />
                                    <IconButton
                                        onClick={() => {
                                            handleDeleteFile(file);
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                <Box my="1rem">
                    <Divider />
                </Box>

                <Typography variant="body1" color="textPrimary">
                    Current Files
                </Typography>
                <List>
                    {files.map((file: any) => (
                        <ListItem key={file.name}>
                            <ListItemAvatar>
                                <Avatar>
                                    <InsertDriveFileIcon />
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Typography color="textPrimary">
                                        {file.name.length > 20
                                            ? file.name.substr(0, 20) + "..."
                                            : file.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography color="textPrimary">
                                        {parseInt(
                                            Math.round(
                                                file.size / 1024
                                            ).toString()
                                        )}{" "}
                                        KB
                                    </Typography>
                                }
                            />

                            {loading &&
                                uploadedFiles.indexOf(file.name) === -1 && (
                                    <CircularProgress />
                                )}
                            {uploadedFiles.indexOf(file.name) !== -1 && (
                                <DoneIcon />
                            )}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Files;
