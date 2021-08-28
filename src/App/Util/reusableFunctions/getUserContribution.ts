import ProjectInstance from "../../../Ethereum/project";

export const getUserContributionInProjectByMetamaskaddress = async (
    projectAddress: string | undefined,
    userAddress: string | undefined
): Promise<string | null> => {
    if (!projectAddress || !userAddress) return null;

    try {
        // Get the current contribution of user in project
        const projectInstance = ProjectInstance(projectAddress);
        // const contributionAmount = (
        //     await projectInstance!.methods.contributions(userAddress).call()
        // ).toString();

        const contributionAmount = await projectInstance!.methods
            .contributions(userAddress)
            .call();

        return contributionAmount;
    } catch (err) {
        return null;
    }
};
