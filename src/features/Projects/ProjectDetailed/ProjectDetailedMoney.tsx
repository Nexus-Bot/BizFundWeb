import {
    Box,
    makeStyles,
    Paper,
    Typography,
    Theme,
    LinearProgress,
    Divider,
    withStyles,
    createStyles,
    Chip,
} from "@material-ui/core";
import React from "react";
import type { Project } from "../../../../types/modelTypes";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
}));

interface Props {
    project: Project;
}

const BorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 10,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: "#F3F3F3",
        },
        bar: {
            borderRadius: 5,
            backgroundColor: "#329932",
        },
    })
)(LinearProgress);

const ProjectDetailedMoney = ({ project }: Props) => {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.root}>
            <Box display="flex" alignItems="center" flexDirection="column">
                <Box display="flex" alignItems="center">
                    <LocalAtmIcon
                        style={{ fontSize: "5rem", color: "#329932" }}
                    />
                    <Typography variant="h3" style={{ color: "#329932" }}>
                        <strong> Funds </strong>
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Box my="0.5rem">
                        <Typography variant="h4" color="textPrimary">
                            Total Pool Balance : {project.totalPoolBalance} $
                            <Typography variant="h6" color="textSecondary">
                                Contributed By Total{" "}
                                <strong>{project.contributorsCount}</strong>{" "}
                                Contributors
                            </Typography>
                        </Typography>
                    </Box>

                    <Divider style={{ width: "100%" }} />
                    <Box my="1rem" width="100%">
                        <Typography variant="h6" color="textSecondary">
                            Current Pool Balance : {project.currentBalance} $
                        </Typography>

                        <Box width="100%">
                            <BorderLinearProgress
                                variant="determinate"
                                value={
                                    (project.currentBalance * 100) /
                                    project.totalPoolBalance
                                }
                            />
                        </Box>
                    </Box>
                    <Divider style={{ width: "100%" }} />
                    <Box my="1rem">
                        <Chip
                            label={
                                <Typography variant="h6" color="textSecondary">
                                    Minimum Contribution :{" "}
                                    {project.minContribution} $
                                </Typography>
                            }
                            variant="outlined"
                            color="secondary"
                            icon={<MonetizationOnIcon />}
                        />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProjectDetailedMoney;
