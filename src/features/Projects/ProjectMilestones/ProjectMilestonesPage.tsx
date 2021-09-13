import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RouteComponentProps } from "react-router";
import {
    getMilestoneDataById,
    getProjectDataByProjectAddress,
    getRequestsForMilestone,
} from "../../../App/Util/reusableFunctions/getProjectData";
import type { RootState } from "../../../redux/store/store";
import useAsyncEffect from "use-async-effect";
import type { Milestone, Project, Request } from "../../../../types/modelTypes";
import ProjectMilestoneHeader from "./ProjectMilestoneHeader";
import ProjectMilestoneRequestsList from "./ProjectMilestoneRequestsList";
import { Box, Container, makeStyles, Theme } from "@material-ui/core";
import MainLoader from "src/App/Util/resuableComp/MainLoader";
import ProjectMilestoneChat from "./ProjectMilestoneChat";
import BG from "../../../Assets/projectPageBG.jpg";

interface Props extends PropsFromRedux, RouteComponentProps<any> {}

interface ComponentState {
    project: Project | null;
    milestone: Milestone | null;
    requests: Request[] | null;
    stateLoading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
    bg: {
        minHeight: "100vh",
        background: `url(${BG}) center center /cover`,
    },
}));

const ProjectMilestonesPage = (props: Props) => {
    const [state, setState] = useState<ComponentState>({
        project: null,
        milestone: null,
        requests: null,
        stateLoading: false,
    });

    useAsyncEffect(async (isMounted) => {
        setState({ ...state, stateLoading: true });
        const projectAddress = props.match.params.projectId;
        const projectData = await getProjectDataByProjectAddress(
            projectAddress
        );

        const milestoneId = props.match.params.milestoneId;
        const milestoneData = await getMilestoneDataById(milestoneId);

        console.log(milestoneData);
        const requestsData = await getRequestsForMilestone(
            projectAddress,
            milestoneData?.requestIds
        );

        if (!isMounted()) return;

        setState({
            project: projectData,
            milestone: milestoneData,
            requests: requestsData,
            stateLoading: false,
        });
    }, []);

    const classes = useStyles();
    return (
        <>
            {state.stateLoading && <MainLoader />}
            {!state.stateLoading && (
                <div className={classes.bg}>
                    <Container
                        maxWidth="lg"
                        style={{
                            paddingTop: "5rem",
                            paddingBottom: "5rem",
                        }}
                    >
                        <Box py="3rem">
                            <ProjectMilestoneHeader
                                milestone={state.milestone}
                                project={state.project}
                            />
                            <ProjectMilestoneRequestsList
                                milestone={state.milestone}
                                requests={state.requests}
                                user={props.user}
                                project={state.project}
                            />
                            <ProjectMilestoneChat
                                milestone={state.milestone}
                                project={state.project}
                            />
                        </Box>
                    </Container>
                </div>
            )}
        </>
    );
};

const mapState2Props = (state: RootState) => {
    return {
        user: state.auth.currentUser,
    };
};

const connector = connect(mapState2Props);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProjectMilestonesPage);
