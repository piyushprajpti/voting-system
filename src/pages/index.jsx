import { Outlet } from "react-router";
import style from "./style.module.scss";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Sidebar from "../components/sidebar";
export const MainLayout = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);

	useEffect(() => {
		window.ethereum.on("accountsChanged", async () => {
			await onConnectToWallet();
		});
	}, []);

	const onConnectToWallet = async () => {
		if (window.ethereum) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const accounts = await provider.send("eth_requestAccounts", []);
			setDefaultAccount(accounts[0]);
		} else {
			setErrorMessage("Metamask wallet not found");
		}
	};

	return (
		<div className={style["container"]}>
			<Sidebar />
			<div className={style["content-container"]}>
				<Header
					account={defaultAccount}
					onConnectWalletClick={onConnectToWallet}
				/>
				<Outlet />
			</div>
		</div>
	);
};
