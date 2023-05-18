import React, { useState, useRef, useCallback } from "react";
import ReactFlow, { MiniMap, addEdge, useNodesState, Background, useEdgesState, Controls, Panel } from "reactflow";
import { Sidebar } from "../components/Sidebar";
import "reactflow/dist/style.css";
import "../styles/flowDragAndDrop.css";

import { initialNodes, initialEdges, getNodeId } from "../data/variable";

export const FlowDragAndDrop = () => {
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [variant, setVariant] = useState("cross");

	const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);

	const onDragOver = useCallback(event => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		event => {
			event.preventDefault();

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			const type = event.dataTransfer.getData("application/reactflow");

			if (typeof type === "undefined" || !type) {
				return;
			}

			const position = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});
			const newNode = {
				id: getNodeId(),
				type,
				position,
				data: { label: `${type} node` },
			};

			setNodes(nds => nds.concat(newNode));
		},
		[reactFlowInstance, setNodes]
	);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: "#FFE4C4",
			}}
			className="dndflow">
			<div className="reactflow-wrapper" ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onInit={setReactFlowInstance}
					onDrop={onDrop}
					onDragOver={onDragOver}>
					<Controls />
					<MiniMap />
					<Background variant={variant} color="#BEBEBE" size={4} />
					<Panel
						position="top-right"
						style={{
							backgroundColor: "#ABCDEF",
							padding: "10px",
							borderRadius: "5px",
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
					</Panel>
				</ReactFlow>
			</div>
			<Sidebar />
		</div>
	);
};
