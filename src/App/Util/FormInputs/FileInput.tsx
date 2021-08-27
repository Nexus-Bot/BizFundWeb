import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import type { UseControllerProps, UseFormSetValue } from "react-hook-form";

interface OwnProps extends UseControllerProps<any> {
    setValue: UseFormSetValue<any>;
    setList: (files: any) => void;
    fileTypes: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },
}));

const FileInput = ({ setValue, setList, fileTypes }: OwnProps) => {
    const classes = useStyles();

    const handleOnChange = () => {
        // @ts-ignore
        const files = document.querySelector("#contained-button-file").files;
        const filesArr = Object.values(files);
        setList(filesArr);
        setValue("files", filesArr);
    };

    const clearInput = () => {
        // @ts-ignore
        document.querySelector("#contained-button-file").value = "";
        setList([]);
        setValue("files", []);
    };

    return (
        <div className={classes.root}>
            <input
                accept={fileTypes}
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleOnChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Select Files
                </Button>
            </label>
            <Button
                variant="contained"
                type="button"
                color="inherit"
                onClick={clearInput}
            >
                Clear
            </Button>
        </div>
    );
};

export default FileInput;
