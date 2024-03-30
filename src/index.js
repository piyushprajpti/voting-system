import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./pages/MainLayout.jsx";
import DashboardScreen from "./pages/Dashboard.jsx";
import CastVoteScreen from "./pages/CastVote.jsx";
import MyPollsScreen from "./pages/MyPolls.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<MainLayout />}>
					<Route index element={<Navigate to={"dashboard"} />} />
					<Route path={"dashboard"} element={<DashboardScreen />} />
					<Route path={"cast-vote"} element={<CastVoteScreen />} />
					<Route path={"my-polls"} element={<MyPollsScreen />} />
					<Route path="*" element={<Navigate to={"/"} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
