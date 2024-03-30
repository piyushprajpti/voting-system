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
		const receipt = await response.target;
		setPoll(response);
	};

	//26855

	const abc = async () => {
		const response = await contractInstance.getPoll(26855);
		// const response = await contractInstance.addVoter(
		// 	26855,
		// 	"0x90F79bf6EB2c4f870365E785982E1f101E93b906"
		// );
		// const response = await contractInstance.addCandidate(
		// 	26855,
		// 	"0x90F79bf6EB2c4f870365E785982E1f101E93b906"
		// );
		// const response = await contractInstance.castVote(
		// 	26855,
		// 	0,
		// 	"0x90F79bf6EB2c4f870365E785982E1f101E93b906"
		// );
		console.log(JSON.parse(JSON.stringify(response, replacer)));
	};

	const replacer = (key, value) => {
		if (typeof value === "bigint") {
			return value.toString();
		}
		return value;
	};

	return (
		<div className={style["container"]}>
			<Sidebar />
			<button onClick={abc}>ABC</button>
			<div className={style["content-container"]}>
				<Header
					account={defaultAccount}
					onConnectWalletClick={connectWithWallet}
					query={query}
					setQuery={setQuery}
					onSearch={getPoll}
				/>
				<div className={style["outlet"]}>
					<Outlet context={[contractInstance, poll]} />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
