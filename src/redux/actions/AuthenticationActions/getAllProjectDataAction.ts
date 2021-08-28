import { fetchProjects } from "../../../redux/reducers/projectReducer";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../../redux/reducers/asyncReducer";
import { getAllProjectsData } from "../../../App/Util/reusableFunctions/getProjectData";

export const getAllProjectDataAction = () => async (dispatch: any) => {
    try {
        dispatch(asycnActionStarted());

        const projects = await getAllProjectsData();

        if (projects !== null) dispatch(fetchProjects(projects));

        dispatch(asyncActionFinished());
    } catch (error) {
        console.log(error);
        dispatch(asyncActionError());
    }
};
