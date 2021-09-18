import web3 from "./web3";
import ProjectCreator from "./Contracts/ProjectCreator.json";

const instance = new web3.eth.Contract(
    ProjectCreator.abi as any,
    "0x5d5D2bFacd74Cf8b88200553b29Fde7de5b6C231"
);

export default instance;
