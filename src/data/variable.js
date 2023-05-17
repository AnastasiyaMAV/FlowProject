import ResizerDefaultNode from "../components/Nodes/ResizerDefaultNode";
import ResizerOutputNode from "../components/Nodes/ResizerOutputNode";
import ResizerInputNode from "../components/Nodes/ResizerInputNode";

export const initialNodes = [
	{ id: "1", position: { x: 250, y: 25 }, data: { label: "1" }, type: "input" },
	{ id: "2", position: { x: 250, y: 100 }, data: { label: "2" } },
];

export const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const getNodeId = () => `randomnode_${+new Date()}`;

export const nodeTypes = {
	ResizerDefaultNode,
	ResizerOutputNode,
	ResizerInputNode,
};
