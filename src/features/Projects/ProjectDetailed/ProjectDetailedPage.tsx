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
import { getProjectDataByProjectAddress } from "../../../App/Util/reusableFunctions/getProjectData";
import { getUserContributionInProjectByMetamaskaddress } from "../../../App/Util/reusableFunctions/getUserContribution";
import ProjectDetailedMoney from "./ProjectDetailedMoney";
import { Box, Grid } from "@material-ui/core";
import MainLoader from "src/App/Util/resuableComp/MainLoader";

interface Props extends PropsFromRedux, RouteComponentProps<any> {}

interface ComponentState {
    project: Project | null;
    projectMaker: ProjectMaker | null;
    contribution: string | null;
}

const ProjectDetailedPage = (props: Props) => {
    const [state, setState] = useState<ComponentState>({
        project: null,
        projectMaker: null,
        contribution: null,
    });

    useAsyncEffect(async (isMounted) => {
        const projectAddress = props.match.params.projectId;
        const projectData = await getProjectDataByProjectAddress(
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
        state.project?.creatorMetamaskAddress?.trim() ===
        props.user?.metamaskAddress?.trim();

    return (
        <>
            {props.loading && <MainLoader />}
            {!props.loading && (
                <Box py="3rem">
                    {state.project && (
                        <Grid container spacing={3}>
                            <Grid item md={8} xs={12}>
                                <ProjectDetailedHeader
                                    project={state.project}
                                    projectMaker={state.projectMaker}
                                    isProjectMaker={isProjectMaker}
                                />
                            </Grid>
                            <Grid item md xs={12}>
                                <ProjectDetailedMoney
                                    project={state.project}
                                    contribution={state.contribution}
                                    isProjectMaker={isProjectMaker}
                                    user={props.user}
                                />
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <ProjectDetailedInfo project={state.project} />
                                <ProjectDetailedMilestones
                                    user={props.user}
                                    project={state.project}
                                />
                                <ProjectDetailedChat project={state.project} />
                            </Grid>
                        </Grid>
                    )}
                </Box>
            )}
        </>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentUser,
        loading: state.async.loading,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProjectDetailedPage);
