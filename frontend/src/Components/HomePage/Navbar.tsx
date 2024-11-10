import React from "react";
import User from "../../assets/user.svg";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface NavbarProps {
	isMenuVisible: boolean;
	setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ isMenuVisible, setIsMenuVisible }: NavbarProps) => {
	const one = isMenuVisible;
	const { authUser } = useAuthContext();

	const handleClick = () => {
		if (!authUser) {
			toast('Please sign in to access your watchlist!', {
				icon: '👏',
			});
		}
	};

	const toggleMenu = () => {
		one
		setIsMenuVisible(isMenuVisible => !isMenuVisible);
	};

	return (
		<div className="flex justify-between pt-4 py-2 bg-top shadow-xl px-10 ">
			<h1 className="text-4xl 3xl:text-5xl font-koulen font-bold text-text ">
				<Link to="/homepage"> MOVIEGIG{" "} </Link>
			</h1>
			<div className="flex col-span-3 gap-12 font-poppins font-medium text-xl 3xl:text-2xl  text-primary pt-1">
				<div>
					<Link to="/homepage">Home</Link>
				</div>
				<div>
					{!authUser ? (
						<Link to="/login" onClick={handleClick}>Watchlist</Link>
					) : (
						<Link to="/watchlist">Watchlist</Link>
					)}
				</div>
				<div>About</div>
			</div>
			{authUser ? (
				<button className="pl-32 3xl:pl-40" type="button" onClick={toggleMenu}>
					<img src={User} alt="user" className="size-10" />
				</button>
			) : (
				<div className="border-2 rounded-md py-2 px-3 border-primary text-primary font-poppins font-semibold text-md 3xl:text-lg">
					<Link to="/signup">Sign up</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
