import type { ProjectMaker } from "types/modelTypes";

export const getProjectMakerDataByMetamuskAddress = async (
    metamuskAddress: string | undefined
): Promise<ProjectMaker | null> => {
    if (metamuskAddress === undefined) return null;

    // Fetch the projectmaker by metamusk address

    return null;
};
