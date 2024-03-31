import { useNavigate } from "react-router";
import style from "./Sidebar.module.scss";

const Sidebar = () => {
	const navigate = useNavigate();
	return (
		<div className={style["container"]}>
			<p className={style["brand-name"]}>Decentralized Voting System</p>
			<div className={style["nav-container"]}>
				{/* <p
					onClick={() => navigate("/dashboard")}
					className={style["nav"]}
				>
					Dashboard
				</p> */}
				<p
					onClick={() => navigate("/cast-vote")}
					className={style["nav"]}
				>
					Cast Vote
				</p>
				<p
					onClick={() => navigate("/my-polls")}
					className={style["nav"]}
				>
					Create Poll
				</p>
			</div>
		</div>
	);
};

export default Sidebar;
