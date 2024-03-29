import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../pages";
import { Homepage } from "../pages/homepage";

export const Router = () => {
	return (
		<Routes>
			<Route path={"/"} element={<MainLayout />}>
				<Route path={"homepage"} element={<Homepage />} />
			</Route>
		</Routes>
	);
};
