import style from "./MyPolls.module.scss";

import { useState } from "react";
import { useOutletContext } from "react-router";
import { Loader } from "../components/Loader";

const MyPolls = () => {
	const [name, setName] = useState();
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [response, setResponse] = useState(null);
	const [processingText, setProcessingText] = useState(null);
	const [contract] = useOutletContext();

	const [loading, setLoading] = useState(false);

	const createPoll = async () => {
		if (!contract) {
			alert("Please connect wallet first");
			return;
		}
		setResponse(null);
		setLoading(true);
		setProcessingText("Initializing Blockchain transaction...");
		const sTime = new Date(startTime).getTime() / 1000;
		const eTime = new Date(endTime).getTime() / 1000;
		await contract.createPoll(name, sTime, eTime);
		setProcessingText("Validating blockchain...");
		contract.on("GeneratedUIDOfPoll", (uid) => {
			setResponse(
				"Poll created on blockchain. Access it with ID: " + uid
			);
			setLoading(false);
		});
	};

	return (
		<div className={style["container"]}>
			{response && <p className={style["response-text"]}>{response}</p>}
			{loading && (
				<div className={style["loading-container"]}>
					<Loader />
					<p className={style["processing-text"]}>{processingText}</p>
				</div>
			)}
			{!loading && (
				<div className={style["form"]}>
					<p className={style["label"]}>Create new poll</p>
					<input
						className={style["input"]}
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter Poll name"
					/>
					<input
						className={style["input"]}
						type="datetime-local"
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						placeholder="Enter start time"
					/>
					<input
						className={style["input"]}
						type="datetime-local"
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						placeholder="Enter end Time"
					/>
					<button onClick={createPoll}>
						{loading ? "Creating poll..." : "Submit"}
					</button>
				</div>
			)}
		</div>
	);
};

export default MyPolls;
