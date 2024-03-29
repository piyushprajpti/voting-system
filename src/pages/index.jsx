import { Outlet } from "react-router";

export const MainLayout = () => {
	return (
		<div className={style["container"]}>
			<Header />
			<Outlet />
		</div>
	);
};
