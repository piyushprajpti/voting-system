import style from "./style.module.scss";
export const Header = ({ onConnectWalletClick, balance, account }) => {
	return (
		<div className={style["container"]}>
			<p>Decentralized Voting System</p>
			{!account ? (
				<button onClick={onConnectWalletClick}>
					Connect To Wallet
				</button>
			) : (
				<div className={style["account-wrapper"]}>
					<p>Logged In as : {getMaskedAccount(account)}</p>
				</div>
			)}
		</div>
	);
};

const getMaskedAccount = (account) => {
	return (account.slice(0, 6) + "..." + account.slice(38)).toUpperCase();
};
