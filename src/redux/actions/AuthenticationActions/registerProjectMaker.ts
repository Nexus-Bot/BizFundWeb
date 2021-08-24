import type { ProjectMakerSignUpForm } from "./../../../../types/formTypes";
import type { ProjectMaker } from "../../../../types/modelTypes";
import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../../redux/reducers/asyncReducer";
import { loginProjectMaker } from "../../../redux/reducers/authReducer";
import history from "../../../history";

interface ProjectMakerData extends ProjectMaker {}

export const registerProjectMaker =
    (formData: ProjectMakerSignUpForm) => async (dispatch: any) => {
        try {
            dispatch(asycnActionStarted());

            // @ts-ignore
            delete formData.confirmPassword;

            const res = await api.post("/projectmakers", {
                ...formData,
                displayName: formData.firstName,
            });

            const user = await res.data;

            localStorage.setItem("logInTokenPM", user.token);
            dispatch(loginProjectMaker(user.projectMakerDoc));

            dispatch(asyncActionFinished());
            history.push("/");
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    };
