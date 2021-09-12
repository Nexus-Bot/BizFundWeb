import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../reducers/asyncReducer";
import { logoutUser } from "../../reducers/authReducer";
import history from "../../../history";

export const logoutProjectMaker = (token: string) => async (dispatch: any) => {
    try {
        dispatch(asycnActionStarted());

        await api.post(
            "/projectmakers/logout",
            {},
            {
                headers: { "Authorization": `Bearer ${token}` },
            }
        );

        dispatch(logoutUser());
        // @ts-ignore
        const weavy = new window.Weavy();
        weavy.authentication.signOut();

        dispatch(asyncActionFinished());
        history.push("/");
    } catch (error) {
        dispatch(asyncActionError());
    }
};
