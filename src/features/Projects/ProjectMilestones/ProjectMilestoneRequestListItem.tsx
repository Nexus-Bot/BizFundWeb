import { Paper, Typography, Box, Grid } from "@material-ui/core";
import React from "react";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import RequestDetails from "./RequestDetails";
import RequestVoting from "./RequestVoting";

interface Props {
    request: Request | null;
    user: BizFundraiser | ProjectMaker | null;
    project: Project | null;
}

const ProjectMilestoneRequestListItem = ({ request, user, project }: Props) => {
    return (
        <Box my="1rem" width="100%">
            <Paper>
                <Typography component="h1" variant="h5">
                    {request?.title}
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <RequestDetails request={request} />
                    </Grid>
                    <Grid item>
                        <RequestVoting
                            request={request}
                            project={project}
                            user={user}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProjectMilestoneRequestListItem;
