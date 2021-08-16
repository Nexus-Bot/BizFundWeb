import {
    Box,
    Button,
    Divider,
    Grid,
    Hidden,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import type { NavbarMenu } from "../../../types/menuTypes";
import history from "../../history";

interface Props extends NavbarMenu {}

const MenuButton = (props: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const BtnText = (text: string) => {
        return (
            <Typography variant="body2" color="inherit">
                {text}
            </Typography>
        );
    };

    const handleClick = (item: { [key: string]: string }) => {
        switch (item.type) {
            case "Link":
                history.push(item.link);
                break;
            // case "Button":
            //     item.action();
            // break;
            default:
                break;
        }
        handleClose();
    };

    const { iconType, items, menuName, name } = props;
    const open = Boolean(anchorEl);
    const Wrapper = iconType;
    const listItems = items.map((item) => (
        <Box width="100%">
            <MenuItem
                onClick={() => {
                    handleClick(item);
                }}
                component={Button}
                style={{ width: "100%" }}
            >
                {item.name}
            </MenuItem>
            <Divider light />
        </Box>
    ));

    return (
        <Box>
            <Grid container direction="row" alignItems="center">
                <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    {<Wrapper />}

                    <Hidden mdUp>
                        <Box ml="1.1rem">{BtnText(menuName)}</Box>
                    </Hidden>

                    {name && BtnText(name)}
                </IconButton>
            </Grid>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
                open={open}
                keepMounted
                getContentAnchorEl={null}
                onClose={handleClose}
            >
                {listItems}
            </Menu>
        </Box>
    );
};

export default MenuButton;
