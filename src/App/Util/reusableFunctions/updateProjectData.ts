import type { Milestone } from "../../../../types/modelTypes";
import api from "../API/backend";

export const addCreatedRequestIdToMilestone = async (
    requestId: number | null,
    milestoneId: string | null,
    token: string | null
): Promise<Milestone | null> => {
    if (!requestId || !milestoneId || !token) return null;

    const res = await api.patch(
        "/project/milestones/createrequest",
        {
            milestoneId,
            requestId,
        },
        {
            headers: { "Authorization": `Bearer ${token}` },
        }
    );

    if (res.data) return res.data;

    return null;
};
