import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Signup = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {


			setIsLoading(true);
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({email,
					username: username,
					password: password}),
			});
			const data = await res.json();

			if (!res.ok) throw new Error(data.error);
			setAuthUser(data);
			

			if (res.status === 201) {
				navigate("/homepage");
				setAuthUser(data);
			}

		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Access the specific error message from response data
				const errorMessage = error.response.data.error || "An error occurred";
				alert(errorMessage);
			} else {
				console.error("There was an error!", error);
				alert("An unexpected error occurred during signup.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<section className="bg-gray-50 dark:bg-background min-h-screen">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<Link
						to="/"
						className="flex items-center mb-6 text-4xl 3xl:text-5xl font-koulen font-bold text-text"
					>
						MOVIEGIG
					</Link>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-bglight dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Create an account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								action="#"
								onSubmit={handleSubmit}
							>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-text dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div>
									<div>
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											User Name
										</label>
										<input
											type="text"
											name="userName"
											id="userName"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-text dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="John"
											required
											onChange={(e) => setUsername(e.target.value)}
										/>
									</div>
									
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-text dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-light text-gray-500 dark:text-gray-300"
										>
											I accept the{" "}
											<a
												className="font-medium text-primary hover:underline dark:text-primary"
												href="https://github.com/Rutetid/StreamSage/blob/main/frontend/T%26C.md"
											>
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="w-full bg-primary hover:bg-primary focus:	ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
								>
									{isLoading ? "Loading..." : "Create an account"}
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link
										to={"/login"}
										className="font-medium text-primary hover:underline dark:text-primary"
									>
										Login here
									</Link>
								</p>
								
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Signup;
