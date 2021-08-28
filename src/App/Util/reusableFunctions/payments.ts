import projectCreator from "../../../Ethereum/projectCreator";
import ProjectInstance from "../../../Ethereum/project";
import web3 from "src/Ethereum/web3";

export const contributeInProject = async (
    isSignedIn: boolean,
    projectAddress: string | undefined,
    value: number | null
): Promise<boolean> => {
    if (!projectAddress || !value) return false;

    // Call the web3.js api to contribute in project
    try {
        let ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.contribute(isSignedIn).send({
            from: accounts[0],
            value: web3.utils.toWei(value.toString(), "ether"),
        });

        return true;
    } catch (err) {
        return false;
    }
};

export const payVendor = async (
    projectAddress: string | undefined,
    requestId: number | undefined
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined) return false;

    // Call the web3.js api to intiate transcation for the vendor payment
    try {
        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.finalizeRequest(requestId).call();

        return true;
    } catch (err) {
        return false;
    }
};

export const checkRefund = async (
    projectAddress: string | undefined
): Promise<string | null> => {
    if (!projectAddress) return null;

    // Call the web3.js api to check refund of contributor
    try {
        const projectInstance = ProjectInstance(projectAddress);
        const response = await projectInstance!.methods.checkRefund().call();

        return web3.utils.fromWei(response, "ether").toString();
        // return response;
    } catch (err) {
        return null;
    }
};

export const getRefund = async (
    projectAddress: string | undefined
): Promise<boolean> => {
    if (!projectAddress) return false;

    // Call the web3.js api to initiate refund of contributor
    try {
        let ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.getRefund().send({
            from: accounts[0],
        });

        return true;
    } catch (err) {
        return false;
    }
};
