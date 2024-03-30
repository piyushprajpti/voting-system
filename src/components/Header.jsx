import style from "./Header.module.scss";
import SearchIcon from "../resource/search.png";
import UserIcon from "../resource/user.png";
export const Header = ({
	onConnectWalletClick,
	account,
	query,
	setQuery,
	onSearch,
}) => {
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			onSearch();
		}
	};
	return (
		<div className={style["container"]}>
			<div className={style["search-bar-container"]}>
				<img src={SearchIcon} alt="" />
				<input
					type="number"
					placeholder="Enter poll ID"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<div className={style["account-wrapper"]}>
					{!account && (
						<button onClick={onConnectWalletClick}>
							Connect to wallet
						</button>
					)}
					{account && (
						<div className={style["account"]}>
							<img src={UserIcon} alt="" />
							<p>{getMaskedAccount(account)}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const getMaskedAccount = (account) => {
	return (account.slice(0, 6) + "..." + account.slice(38)).toUpperCase();
};
