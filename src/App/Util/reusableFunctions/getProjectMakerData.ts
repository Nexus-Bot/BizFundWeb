import type { ProjectMaker } from "../../../../types/modelTypes";
import api from "../API/backend";

export const getProjectMakerDataByMetamaskAddress = async (
    metamaskAddress: string | undefined
): Promise<ProjectMaker | null> => {
    if (metamaskAddress === undefined) return null;
    try {
        // Fetch the projectmaker by metamask address
        const res = await api.get(
            `/projectmakersbymetamask/${metamaskAddress}`
        );

        if (res.data) return res.data;

        return null;
    } catch (err) {
        return null;
    }
};
