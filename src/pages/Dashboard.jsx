import style from "./Dashboard.module.scss";

const Dashboard = () => {
	return (
		<div className={style["container"]}>
			<div className={style["stats-row"]}>
				<div className={style["stat"]}>
					<img src="" alt="" />
					<p>Total participation : 89</p>
				</div>
				<div className={style["stat"]}>
					<img src="" alt="" />
					<p>Total participation : 89</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
