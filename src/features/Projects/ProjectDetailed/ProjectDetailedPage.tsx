import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RouteComponentProps } from "react-router";
import { getProjectMakerDataByMetamaskAddress } from "../../../App/Util/reusableFunctions/getProjectMakerData";
import useAsyncEffect from "use-async-effect";
import type { Project, ProjectMaker } from "../../../../types/modelTypes";
import type { RootState } from "../../../redux/store/store";
import ProjectDetailedChat from "./ProjectDetailedChat";
import ProjectDetailedHeader from "./ProjectDetailedHeader";
import ProjectDetailedInfo from "./ProjectDetailedInfo";
import ProjectDetailedMilestones from "./ProjectDetailedMilestones";
import { getProjectDataByMetamaskAddress } from "../../../App/Util/reusableFunctions/getProjectData";
import { getUserContributionInProjectByMetamaskaddress } from "../../../App/Util/reusableFunctions/getUserContribution";
import ProjectDetailedMoney from "./ProjectDetailedMoney";
import { Box, Grid } from "@material-ui/core";

interface Props extends PropsFromRedux, RouteComponentProps<any> {}

interface ComponentState {
    project: Project | null;
    projectMaker: ProjectMaker | null;
    contribution: number | null;
}

const ProjectDetailedPage = (props: Props) => {
    const [state, setState] = useState<ComponentState>({
        project: null,
        projectMaker: null,
        contribution: null,
    });

    useAsyncEffect(async (isMounted) => {
        const projectAddress = props.match.params.projectId;
        const projectData = await getProjectDataByMetamaskAddress(
            projectAddress
        );

        const projectMaker = await getProjectMakerDataByMetamaskAddress(
            projectData?.creatorMetamaskAddress
        );

        const contribution =
            await getUserContributionInProjectByMetamaskaddress(
                projectData?.id,
                props.user?.metamaskAddress
            );

        if (!isMounted()) return;

        setState({
            project: projectData,
            projectMaker: projectMaker,
            contribution: contribution,
        });
    }, []);

    const isProjectMaker =
        state.project?.creatorMetamaskAddress === props.user?.metamaskAddress;

    return (
        <Box py="3rem">
            {state.project && (
                <Grid container spacing={3}>
                    <Grid item md={8} xs={12}>
                        <ProjectDetailedHeader
                            project={state.project}
                            projectMaker={state.projectMaker}
                            contribution={state.contribution}
                            isProjectMaker={isProjectMaker}
                        />
                    </Grid>
                    <Grid item md xs={12}>
                        <ProjectDetailedMoney project={state.project} />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ProjectDetailedInfo project={state.project} />
                        <ProjectDetailedMilestones
                            user={props.user}
                            project={state.project}
                        />
                        <ProjectDetailedChat />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentUser,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProjectDetailedPage);
