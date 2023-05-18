import React from "react";

import "reactflow/dist/style.css";
import { Flow } from "./pages/Flow";
import { FlowDragAndDrop } from "./pages/FlowDragAndDrop";
import { Navigation } from "./components/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const App = () => {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route index element={<Flow />} />
				<Route path="flow/" element={<Flow />} />
				<Route path="/flowDragAndDrop/" element={<FlowDragAndDrop />} />
			</Routes>
		</Router>
	);
};
