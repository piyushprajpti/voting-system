import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import { MainLayout } from "../pages";
import Dashboard from "../pages/dashboard";
import MyPolls from "../pages/my-polls";
import CastVote from "../pages/cast-vote";

export const Router = () => {
	return (
		<Routes>
			<Route path={"login"} element={<Login />} />
			<Route path={"/"} element={<MainLayout />}>
				<Route path={"dashboard"} element={<Dashboard />} />
				<Route path={"cast-vote"} element={<CastVote />} />
				<Route path={"my-polls"} element={<MyPolls />} />
			</Route>
			<Route path={"*"} element={<Navigate to={"/"} />} />
		</Routes>
	);
};
