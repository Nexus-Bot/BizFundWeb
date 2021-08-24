import type { BizFundraiserSignInForm } from "./../../../../types/formTypes";
import type { BizFundraiser } from "../../../../types/modelTypes";
import api from "../../../App/Util/API/backend";
import {
    asycnActionStarted,
    asyncActionError,
    asyncActionFinished,
} from "../../../redux/reducers/asyncReducer";
import { loginBizFundraiser } from "../../../redux/reducers/authReducer";
import history from "../../../history";

interface BizFundraiserData extends BizFundraiser {}

export const loginBizFundraiserAction =
    (formData: BizFundraiserSignInForm) => async (dispatch: any) => {
        try {
            dispatch(asycnActionStarted());

            const res = await api.post("/bizfundraisers/login", {
                ...formData,
            });

            const user = await res.data;

            localStorage.setItem("logInTokenBF", user.token);
            dispatch(loginBizFundraiser(user.bizFundraiser));
            history.push("/projects");

            dispatch(asyncActionFinished());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    };
