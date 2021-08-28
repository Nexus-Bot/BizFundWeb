import type { BizFundraiser, ProjectMaker } from "../../../../types/modelTypes";
import api from "../API/backend";

export const updateBizFundraiser = async (
    data: any | null,
    token: string | null
): Promise<BizFundraiser | null> => {
    if (!data || !token) return null;

    try {
        const res = await api.patch(
            "/bizfundraisers/me",
            { ...data },
            {
                headers: { "Authorization": `Bearer ${token}` },
            }
        );

        if (res.data) return res.data;

        return null;
    } catch (err) {
        return null;
    }
};

export const updateProjectMaker = async (
    data: any | null,
    token: string | null
): Promise<ProjectMaker | null> => {
    if (!data || !token) return null;

    try {
        const res = await api.patch(
            "/projectmakers/me",
            { ...data },
            {
                headers: { "Authorization": `Bearer ${token}` },
            }
        );

        if (res.data) return res.data;

        return null;
    } catch (err) {
        return null;
    }
};
