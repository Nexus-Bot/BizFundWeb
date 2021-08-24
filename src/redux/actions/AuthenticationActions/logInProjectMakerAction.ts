import type { ProjectMakerSignInForm } from "./../../../../types/formTypes";
import type { ProjectMaker } from "../../../../types/modelTypes";
import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../reducers/asyncReducer";
import { loginProjectMaker } from "../../reducers/authReducer";
import history from "../../../history";

interface ProjectMakerData extends ProjectMaker {}

export const loginProjectMakerAction =
    (formData: ProjectMakerSignInForm) => async (dispatch: any) => {
        try {
            dispatch(asycnActionStarted());

            const res = await api.post("/projectmakers/login", { ...formData });

            const user = await res.data;

            localStorage.setItem("logInTokenPM", user.token);
            dispatch(loginProjectMaker(user.projectMaker));
            history.push("/projects");

            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    };
