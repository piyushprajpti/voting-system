export const ContractAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
export const ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "GeneratedUIDOfPoll",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		name: "OnCandidateAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		name: "OnCandidateRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		name: "OnPollRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		name: "OnVoterAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		name: "OnVoterRemoved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		name: "onVoteCastEvent",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "candidateId",
				type: "address",
			},
		],
		name: "addCandidate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "voterId",
				type: "address",
			},
		],
		name: "addVoter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "voter",
				type: "address",
			},
		],
		name: "castVote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "title",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "startTime",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "endTime",
				type: "uint256",
			},
		],
		name: "createPoll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
		],
		name: "getPoll",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "uid",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "title",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "startTime",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "endTime",
						type: "uint256",
					},
					{
						components: [
							{
								internalType: "address",
								name: "id",
								type: "address",
							},
							{
								internalType: "uint256",
								name: "voteCount",
								type: "uint256",
							},
						],
						internalType: "struct Database.Candidate[]",
						name: "candidates",
						type: "tuple[]",
					},
					{
						components: [
							{
								internalType: "address",
								name: "id",
								type: "address",
							},
							{
								internalType: "bool",
								name: "isVoted",
								type: "bool",
							},
						],
						internalType: "struct Database.Voter[]",
						name: "voters",
						type: "tuple[]",
					},
					{
						internalType: "address",
						name: "organiser",
						type: "address",
					},
				],
				internalType: "struct Database.Poll",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "pollId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "userId",
				type: "address",
			},
		],
		name: "isVoteCasted",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "pollId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "userId",
				type: "address",
			},
		],
		name: "isVoterEligible",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "removeCandidate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
		],
		name: "removePoll",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "uid",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
		],
		name: "removeVoter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
