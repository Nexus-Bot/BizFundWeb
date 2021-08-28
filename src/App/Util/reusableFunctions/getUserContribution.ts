import ProjectInstance from "../../../Ethereum/project";
import web3 from "../../../Ethereum/web3";

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

        return web3.utils.fromWei(contributionAmount, "ether");
    } catch (err) {
        return null;
    }
};
