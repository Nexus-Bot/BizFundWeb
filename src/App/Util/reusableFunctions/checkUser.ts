import ProjectInstance from "../../../Ethereum/project";

export const checkUserIsContributor = async (
    projectAddress: string | undefined,
    userAddress: string | undefined
): Promise<boolean | null> => {
    if (!projectAddress || !userAddress) return false;

    try {
        // Call the web3.js api to check if user is contributor
        const projectInstance = ProjectInstance(projectAddress);
        const isContributor = await projectInstance!.methods
            .contributors(userAddress)
            .call();
        return isContributor;
    } catch (err) {
        return false;
    }
};

export const checkUserIsVoterForRequest = async (
    projectAddress: string | undefined,
    userAddress: string | undefined,
    requestIndex: number | undefined
): Promise<boolean> => {
    if (!projectAddress || !userAddress || !requestIndex) return false;
    try {
        // Call the web3.js api to check if user already voted
        const projectInstance = ProjectInstance(projectAddress);
        const isVoter = await projectInstance!.methods
            .isVoted(userAddress, requestIndex)
            .call();

        return isVoter;
    } catch (err) {
        return false;
    }
};
