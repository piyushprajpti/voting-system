import { useOutletContext } from "react-router";
import style from "./CastVote.module.scss";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import {
	POLL_STATUS_CLOSED,
	POLL_STATUS_LIVE,
	POLL_STATUS_SCHEDULED,
	getPlainObject,
	getPollStatus,
} from "./MainLayout";

const CastVote = () => {
	const [contract, poll, setQuery, getPoll] = useOutletContext();

	const [status, setStatus] = useState(POLL_STATUS_SCHEDULED);
	const [eligible, setEligible] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	const [showAddCandidateForm, setShowAddCandidateForm] = useState(false);
	const [showAddVoterForm, setShowAddVoterForm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isVoted, setIsVoted] = useState(false);
	const [processingText, setProcessingText] = useState("");
	const [newCandidateName, setNewCandidateName] = useState("");
	const [newVoterId, setNewVoterId] = useState("");

	const checkEligibility = async () => {
		const eligible = await contract.isVoterEligible(poll[0]);
		setEligible(eligible);
	};

	const checkOwnerShip = async () => {
		const owner = await contract.isPollOwner(poll[0]);
		setIsOwner(owner);
	};

	const checkIsVoted = async () => {
		const isVoted = await contract.isVoteCasted(poll[0]);
		setIsVoted(isVoted);
	};

	const addCandidate = async () => {
		setLoading(true);
		setProcessingText("Adding new candidate...");
		await contract.addCandidate(poll[0], newCandidateName);
		setProcessingText("Validating data on blockchain...");
		contract.on("OnCandidateAdded", () => {
			setProcessingText("Candidate Addded successfully");
			setQuery(poll[0]);
			getPoll();
			setShowAddCandidateForm(false);
			setLoading(false);
			setNewCandidateName("");
		});
	};

	const addVoter = async () => {
		setLoading(true);
		setProcessingText("Adding new voter...");
		await contract.addVoter(poll[0], newVoterId);
		setProcessingText("Validating data on blockchain...");
		contract.on("OnVoterAdded", () => {
			setProcessingText("Voter Addded successfully");
			setQuery(poll[0]);
			getPoll();
			setShowAddVoterForm(false);
			setLoading(false);
			setNewVoterId("");
		});
	};

	const castVote = async (index) => {
		setLoading(true);
		await contract.castVote(poll[0], index);
		setLoading(false);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (poll) setStatus(getPollStatus(poll[2], poll[3]));
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (!poll) return;
		checkEligibility();
		checkOwnerShip();
		checkIsVoted();
		console.log(poll);
	}, [poll]);

	return (
		<div className={style["container"]}>
			{isOwner && (
				<div className={style["owner-action-container"]}>
					<button onClick={() => setShowAddCandidateForm(true)}>
						Add candidate
					</button>
					<button onClick={() => setShowAddVoterForm(true)}>
						Add Voter
					</button>
					<button>Delete Poll</button>
				</div>
			)}
			{showAddCandidateForm && (
				<div className={style["add-candidate-form"]}>
					<input
						type="text"
						value={newCandidateName}
						onChange={(e) => setNewCandidateName(e.target.value)}
						placeholder="Name of candidate"
					/>
					{!loading && <button onClick={addCandidate}>Submit</button>}
					<p className={style["processing-text"]}>{processingText}</p>
				</div>
			)}
			{showAddVoterForm && (
				<div className={style["add-candidate-form"]}>
					<input
						type="text"
						value={newVoterId}
						onChange={(e) => setNewVoterId(e.target.value)}
						placeholder="Id of voter"
					/>
					{!loading && <button onClick={addVoter}>Submit</button>}
					<p className={style["processing-text"]}>{processingText}</p>
				</div>
			)}
			<div className={style["poll-container"]}>
				{poll && (
					<div className={style["poll"]}>
						<div className={style["poll-id-n-time"]}>
							<p className={style["poll-id"]}>
								POLL ID: <span>#</span> {poll[0]}
							</p>
							{status === POLL_STATUS_LIVE && (
								<p className={style["poll-live"]}>
									Poll is live until{" "}
									{new Date(poll[3]).toUTCString()} PM
								</p>
							)}
							{status === POLL_STATUS_SCHEDULED && (
								<p className={style["poll-schedule"]}>
									Poll will start from
									{new Date(poll[2]).toUTCString()} PM
								</p>
							)}
							{status === POLL_STATUS_CLOSED && (
								<p className={style["poll-closed"]}>
									Poll is closed
								</p>
							)}
						</div>
						<p className={style["poll-name"]}>{poll[1]}</p>
						{poll[4].map((candidate, index) => {
							return (
								<div key={index} className={style["candidate"]}>
									<p className={style["candidate-name"]}>
										{candidate[0]}
									</p>
									{eligible && (
										<button
											className={style["vote-button"]}
											onClick={() => castVote(index)}
										>
											Vote
										</button>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default CastVote;
