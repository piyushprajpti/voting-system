import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router";

const Login = () => {
	const navigate = useNavigate();

	const [isWalletAvailable, setIsWalletAvailable] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsWalletAvailable(window.ethereum);
	}, []);

	const onConnectToWallet = async () => {
		if (isWalletAvailable) {
			setLoading(true);
			const provider = new ethers.BrowserProvider(window.ethereum);
			const accounts = await provider.send("eth_requestAccounts", []);
			setLoading(false);
			navigate("/homepage", { state: { account: accounts[0] } });
		} else {
			setErrorMessage("Wallet not found");
		}
	};
	return (
		<div className={style["container"]}>
			<div className={style["login-wrapper"]}>
				<p className={style["brand-name"]}>
					Lorem ipsum dolor sit amet
				</p>
				{errorMessage && <p>{errorMessage}</p>}
				<div
					onClick={onConnectToWallet}
					className={style["connect-button"]}
				>
					<img src="" alt="" />
					<p>Connect with wallet</p>
				</div>
				<p className={style["footer-message"]}>Team Name: TeamTech</p>
			</div>
		</div>
	);
};

export default Login;
