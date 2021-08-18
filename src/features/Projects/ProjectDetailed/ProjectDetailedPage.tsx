import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import type { RouteComponentProps } from "react-router";
import { getProjectMakerDataByMetamuskAddress } from "../../../App/Util/reusableFunctions/getProjectMakerData";
import useAsyncEffect from "use-async-effect/types";
import type {
    BizFundraiser,
    Project,
    ProjectMaker,
} from "../../../../types/modelTypes";
import type { RootState } from "../../../redux/store/store";
import ProjectDetailedChat from "./ProjectDetailedChat";
import ProjectDetailedHeader from "./ProjectDetailedHeader";
import ProjectDetailedInfo from "./ProjectDetailedInfo";
import ProjectDetailedMilestones from "./ProjectDetailedMilestones";
import { getProjectDataByMetamuskAddress } from "src/App/Util/reusableFunctions/getProjectData";

const checkUserIsContributor = async (
    project: Project | null,
    user: BizFundraiser | ProjectMaker | null
): Promise<boolean> => {
    if (project === null || user === null) return false;
    // Call the API

    return true;
};

interface Props extends PropsFromRedux, RouteComponentProps<any> {}

interface ComponentState {
    project: Project | null;
    projectMaker: ProjectMaker | null;
    isContributor: boolean;
}

const ProjectDetailedPage = (props: Props) => {
    const [state, setState] = useState<ComponentState>({
        project: null,
        projectMaker: null,
        isContributor: false,
    });

    useAsyncEffect(async (isMounted) => {
        const projectAddress = props.match.params.projectId;
        const projectData = await getProjectDataByMetamuskAddress(
            projectAddress
        );

        const projectMaker = await getProjectMakerDataByMetamuskAddress(
            projectData?.creatorMetamuskAddress
        );

        const isContributor = await checkUserIsContributor(
            projectData,
            props.user
        );

        if (!isMounted()) return;

        setState({
            project: projectData,
            projectMaker: projectMaker,
            isContributor: isContributor,
        });
    }, []);

    const isProjectMaker =
        state.project?.creatorMetamuskAddress === props.user?.metamuskAddress;

    return (
        <div>
            {state.project && (
                <div>
                    <ProjectDetailedHeader
                        project={state.project}
                        projectMaker={state.projectMaker}
                        isContributor={state.isContributor}
                        isProjectMaker={isProjectMaker}
                    />
                    <ProjectDetailedInfo project={state.project} />
                    <ProjectDetailedMilestones
                        user={props.user}
                        project={state.project}
                    />
                    <ProjectDetailedChat />
                </div>
            )}
        </div>
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
