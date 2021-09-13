import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background:
            "linear-gradient(-45deg, rgba(57,210,98,1) 50%, rgba(59,131,218,1) 50%)",
        borderRadius: 3,
        border: 0,
        margin: "0 1rem",
        color: "white",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        "@media (max-width:960px)": {
            fontSize: "0.6rem",
        },
        "@media (max-width:355px)": {
            fontSize: "0.5rem",
        },
    },
}));

interface Props {
    buttonTitle: string;
    link: string;
}

const MainButton = (props: Props) => {
    const classes = useStyles();
    const { buttonTitle, link } = props;

    return (
        <Button
            className={classes.root}
            component={Link}
            to={link}
            variant="contained"
        >
            {buttonTitle}
        </Button>
    );
};

export default MainButton;
