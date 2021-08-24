import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import type { Project } from "../../../../types/modelTypes";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

interface Props {
    project: Project;
}

const ProjectDetailedMoney = ({ project }: Props) => {
    return (
        <Paper elevation={3}>
            <Box display="flex" alignItems="center" flexDirection="column">
                <Box display="flex" alignItems="center">
                    <LocalAtmIcon fontSize="large" />
                    <Typography component="h1" variant="h5">
                        Funds
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Typography variant="body1" color="textPrimary">
                        Total Pool Balance : {project.totalPoolBalance}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Current Pool Balance : {project.currentBalance}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Minimum Contribution : {project.minContribution}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Total Contributors : {project.contributorsCount}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProjectDetailedMoney;
