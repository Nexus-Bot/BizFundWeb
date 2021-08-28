import web3 from "./web3";
import ProjectCreator from "./Contracts/ProjectCreator.json";

const instance = new web3.eth.Contract(
    ProjectCreator.abi as any,
    "0x144A1C676ebcfEEac3CE1501f0131Fb302769971"
);

export default instance;
