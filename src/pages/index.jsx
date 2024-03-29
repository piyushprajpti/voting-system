import { Outlet } from "react-router";
import style from "./style.module.scss";
import {Header} from "../components/header"
export const MainLayout = () => {
	return (
		<div className={style["container"]}>
			<Header />
			<Outlet />
		</div>
	);
};
