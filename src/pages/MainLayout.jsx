import { Outlet } from "react-router";
import style from "./MainLayout.module.scss";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Sidebar from "../components/Sidebar";
import { ABI, ContractAddress } from "../constants";
import { async } from "q";

const MainLayout = () => {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contractInstance, setContractInstance] = useState(null);

	const [query, setQuery] = useState("");

	const [poll, setPoll] = useState(null);

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", async () => {
				await connectWithWallet();
			});
		}
	}, []);

	const connectWithWallet = async () => {
		if (window.ethereum) {
			setLoading(true);
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			setSigner(signer);
		} else {
			setErrorMessage("Metamask wallet not found");
		}
	};

	useEffect(() => {
		if (!signer) return;
		getAccount();
		getContract();
		setLoading(false);
	}, [signer]);

	const getAccount = async () => {
		const accountAddress = await signer.getAddress();
		setDefaultAccount(accountAddress);
	};

	const getContract = () => {
		const contract = new ethers.Contract(ContractAddress, ABI, signer);
		setContractInstance(contract);
	};

	useEffect(() => {
		if (contractInstance) setLoading(false);
	}, [contractInstance]);

	const getPoll = async () => {
		const response = await contractInstance.getPoll(parseInt(query));
		setPoll(getPlainObject(response));
	};

	//26855

	return (
		<div className={style["container"]}>
			<Sidebar />
			<div className={style["content-container"]}>
				<Header
					account={defaultAccount}
					onConnectWalletClick={connectWithWallet}
					query={query}
					setQuery={setQuery}
					onSearch={getPoll}
				/>
				<div className={style["outlet"]}>
					<Outlet
						context={[contractInstance, poll, setQuery, getPoll]}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainLayout;

const replacer = (key, value) => {
	if (typeof value === "bigint") {
		return Number(value);
	}
	return value;
};

export const getPlainObject = (proxyObject) => {
	return JSON.parse(JSON.stringify(proxyObject, replacer));
};

export const POLL_STATUS_SCHEDULED = -1;
export const POLL_STATUS_LIVE = 1;
export const POLL_STATUS_CLOSED = 0;

export const getPollStatus = (startTime, endTime) => {
	const currentTimestamp = Date.now() / 1000;
	if (startTime > currentTimestamp) return POLL_STATUS_SCHEDULED;
	else if (endTime < currentTimestamp) return POLL_STATUS_CLOSED;
	else return POLL_STATUS_LIVE;
};
