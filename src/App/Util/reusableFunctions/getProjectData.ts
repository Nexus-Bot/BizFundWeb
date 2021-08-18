import type { Project } from "types/modelTypes";

export const getProjectDataByMetamuskAddress = async (
    metamuskAddress: string | undefined
): Promise<Project | null> => {
    if (metamuskAddress === undefined) return null;

    // Fetch the projectmaker by metamusk address

    return null;
};
