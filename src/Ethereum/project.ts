import web3 from "./web3";
import Project from "./Contracts/Project.json";

export default function ProjectInstance(address: string | undefined) {
    if (address === undefined) return null;

    return new web3.eth.Contract(Project.abi as any, address);
}
