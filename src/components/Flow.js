import React, { useCallback, useState } from "react";
import ReactFlow, {
	MiniMap,
	Controls,
	Panel,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	getIncomers,
	getOutgoers,
	getConnectedEdges,
} from "reactflow";

import { initialNodes, initialEdges, getNodeId, nodeTypes } from "../data/variable";

import "../styles/flow.css";

export const Flow = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [variant, setVariant] = useState("cross");
	const [name, setName] = useState("");

	const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);

	const onAddNode = useCallback(
		typeNode => {
			const newNode = {
				id: getNodeId(),
				type: typeNode,
				data: { label: `${name}` },
				position: {
					x: window.innerWidth / 2,
					y: window.innerHeight / 2,
				},
				style: { background: "#fff", border: "1px solid black", fontSize: 12 },
			};
			setNodes(nds => nds.concat(newNode));
		},
		[name, setNodes]
	);

	const onNodesDelete = useCallback(
		deleted => {
			setEdges(
				deleted.reduce((acc, node) => {
					const incomers = getIncomers(node, nodes, edges);
					const outgoers = getOutgoers(node, nodes, edges);
					const connectedEdges = getConnectedEdges([node], edges);

					const remainingEdges = acc.filter(edge => !connectedEdges.includes(edge));

					const createdEdges = incomers.flatMap(({ id: source }) =>
						outgoers.map(({ id: target }) => ({
							id: `${source}->${target}`,
							source,
							target,
						}))
					);

					return [...remainingEdges, ...createdEdges];
				}, edges)
			);
		},
		[setEdges, edges, nodes]
	);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: "#FFE4C4",
			}}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onNodesDelete={onNodesDelete}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}>
				<Controls />
				<MiniMap />
				<Background variant={variant} color="#BEBEBE" size={4} />
				<Panel
					position="top-right"
					style={{
						backgroundColor: "#ABCDEF",
						padding: "10px",
					}}>
					<div className="buttonGroupClass">
						<span>Pattern background:</span>
						<button className="buttonClass" onClick={() => setVariant("dots")}>
							dots
						</button>
						<button className="buttonClass" onClick={() => setVariant("lines")}>
							lines
						</button>
						<button className="buttonClass" onClick={() => setVariant("cross")}>
							cross
						</button>
					</div>
					<div className="buttonGroupClass">
						<span>Adding a Node:</span>
						<input type="text" placeholder="Enter node name" onChange={e => setName(e.target.value)} name="title" />
						<button className="buttonClass" onClick={() => onAddNode("ResizerDefaultNode")}>
							Addition default node
						</button>
						<button className="buttonClass" onClick={() => onAddNode("ResizerInputNode")}>
							Addition input node
						</button>
						<button className="buttonClass" onClick={() => onAddNode("ResizerOutputNode")}>
							Addition output node
						</button>
					</div>
				</Panel>
			</ReactFlow>
		</div>
	);
};
