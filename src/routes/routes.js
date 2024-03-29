import { Routes, Route } from "react-router-dom";

export const Router = () => {
	return (
		<Routes>
			<Route path={"/"} element={<MainLayout />}>
				<Route path={"homepage"} element={<Homepage />} />
			</Route>
		</Routes>
	);
};
