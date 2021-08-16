import { Drawer, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";

const useStyles = makeStyles({
    paper: {
        background: "#2E3B55",
        color: "white",
        padding: "1rem",
    },
});

interface Props {
    drawerList: () => JSX.Element;
}

type Anchor = "top" | "left" | "bottom" | "right";

const SideDrawer = ({ drawerList }: Props) => {
    const styles = useStyles();
    const [state, setState] = useState({ right: false });

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    return (
        <React.Fragment>
            <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer("right", true)}
            >
                <Menu fontSize="large" style={{ color: `white` }} />
            </IconButton>

            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer("right", false)}
                classes={{ paper: styles.paper }}
            >
                {drawerList()}
            </Drawer>
        </React.Fragment>
    );
};

export default SideDrawer;
