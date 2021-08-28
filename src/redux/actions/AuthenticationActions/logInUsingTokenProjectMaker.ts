import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../reducers/asyncReducer";
import { loginProjectMaker } from "../../reducers/authReducer";

export const loginUsingTokenProjectMaker =
    (token: string) => async (dispatch: any) => {
        try {
            dispatch(asycnActionStarted());

            const res = await api.post(
                "/projectmakers/login/token",
                {},
                {
                    headers: { "Authorization": `Bearer ${token}` },
                }
            );

            const user = await res.data;
            localStorage.setItem("logInTokenPM", token);
            dispatch(loginProjectMaker(user));

            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    };
