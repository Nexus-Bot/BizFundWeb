import web3 from "./web3";
import ProjectCreator from "./Contracts/ProjectCreator.json";

const instance = new web3.eth.Contract(
    ProjectCreator.abi as any,
    "0x2D89Cd93D241079D91Ad224620c6dA628C343bA3"
);

export default instance;
