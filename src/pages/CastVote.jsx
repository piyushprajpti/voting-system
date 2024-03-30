import { useOutletContext } from "react-router";
import style from "./CastVote.module.scss";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import { ethers } from "ethers";

const CastVote = () => {
	const [contract, poll] = useOutletContext();

	useEffect(() => {
		console.log(poll);
	}, [poll]);

	const abc = async () => {
		const response = await contract.addVoter(
			45487,
			"0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
		);
		console.log(response);
	};

	const candidates = [
		"Candidate 1",
		"Candidate 2",
		"Candidate 3",
		"Candidate 4",
		"Candidate 5",
		"Candidate 6",
	];

	return (
		<div className={style["container"]}>
			<button onClick={abc}>asdawdasd</button>
			<div className={style["poll-container"]}>
				{poll && (
					<div className={style["poll"]}>
						<div className={style["poll-id-n-time"]}>
							<p className={style["poll-id"]}>
								POLL ID: <span>#</span> {}
							</p>
							<p className={style["poll-live"]}>
								Poll is live until 5:00 PM
							</p>
							<p className={style["poll-schedule"]}>
								Poll will start from 8:00 AM
							</p>
							<p className={style["poll-closed"]}>
								Poll is closed
							</p>
						</div>
						<p className={style["poll-name"]}>
							This is a testing pole
						</p>
						{candidates.map((candidate, index) => {
							return (
								<div className={style["candidate"]}>
									<p className={style["candidate-name"]}>
										{candidate}
									</p>
									<button className={style["vote-button"]}>
										Vote
									</button>
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
