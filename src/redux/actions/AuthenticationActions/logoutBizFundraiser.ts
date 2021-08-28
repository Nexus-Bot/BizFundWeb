import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../reducers/asyncReducer";
import { logoutUser } from "../../reducers/authReducer";
import history from "../../../history";

export const logoutBizFundraiser = (token: string) => async (dispatch: any) => {
    try {
        dispatch(asycnActionStarted());

        await api.post(
            "/bizfundraisers/logout",
            {},
            {
                headers: { "Authorization": `Bearer ${token}` },
            }
        );

        dispatch(logoutUser());

        dispatch(asyncActionFinished());
        history.push("/");
    } catch (error) {
        console.log(error);
        dispatch(asyncActionError());
    }
};
