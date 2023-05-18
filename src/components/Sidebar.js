import React from "react";

export const Sidebar = () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<aside>
			<span>You can drag these nodes to the pane on the right</span>
			<div>
				<div className="dndnode input" onDragStart={event => onDragStart(event, "input")} draggable>
					Input Node
				</div>
				<div className="dndnode input dot" />
			</div>

			<div>
				<div className="dndnode top dot" />
				<div className="dndnode" onDragStart={event => onDragStart(event, "default")} draggable>
					Default Node
				</div>
				<div className="dndnode bottom dot" />
			</div>

			<div>
				<div className="dndnode output" onDragStart={event => onDragStart(event, "output")} draggable>
					Output Node
				</div>
            <div className="dndnode output dot" />
			</div>
		</aside>
	);
};
