import web3 from "./web3";
import ProjectCreator from "./Contracts/ProjectCreator.json";

const instance = new web3.eth.Contract(
    ProjectCreator.abi as any,
    "0x94f67D11d47504c8d9883eab4638c16D2B7B3E0e"
);

export default instance;
