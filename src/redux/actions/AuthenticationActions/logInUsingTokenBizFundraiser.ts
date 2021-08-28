import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../reducers/asyncReducer";
import { loginBizFundraiser } from "../../reducers/authReducer";

export const loginUsingTokenBizFundraiser =
    (token: string) => async (dispatch: any) => {
        try {
            dispatch(asycnActionStarted());

            const res = await api.post(
                "/bizfundraisers/login/token",
                {},
                {
                    headers: { "Authorization": `Bearer ${token}` },
                }
            );

            const user = await res.data;
            localStorage.setItem("logInTokenBF", token);
            dispatch(loginBizFundraiser(user));

            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    };
