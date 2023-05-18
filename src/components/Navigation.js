import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Panel, ReactFlowProvider } from "reactflow";

export const Navigation = () => {
	return (
		<>
			<ReactFlowProvider>
				<Panel
					style={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: "#8cbdee ",
						padding: "10px",
						borderRadius: "5px",
					}}>
					<span>Navigation:</span>
					<NavLink to="/">Flow</NavLink>
					<NavLink to="/flowDragAndDrop">Flow Drag and Drop</NavLink>
				</Panel>
			</ReactFlowProvider>
			<Outlet />
		</>
	);
};
