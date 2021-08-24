import type { BizFundraiserSignUpForm } from "./../../../../types/formTypes";
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

export const registerBizFundraiser =
    (formData: BizFundraiserSignUpForm) => async (dispatch: any) => {
        try {
            dispatch(asycnActionStarted());

            // @ts-ignore
            delete formData.confirmPassword;

            const res = await api.post("/bizfundraisers", {
                ...formData,
                displayName: formData.firstName,
            });

            const user = await res.data;

            localStorage.setItem("logInTokenBF", user.token);
            dispatch(loginBizFundraiser(user.bizFundraiserDoc));

            dispatch(asyncActionFinished());
            history.push("/projects");
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    };
