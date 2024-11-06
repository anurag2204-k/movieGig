import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
	const [isLoading, setIsLoading]=React.useState(false)
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.error);
			setAuthUser(data);
			if (res.status === 200) {
				navigate("/homepage");
				
			} 
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
                // Access the specific error message from response data
                const errorMessage = error.response.data.error || "An error occurred";
                alert(errorMessage);
            } else {
                console.error("There was an error!", error);
                alert("An unexpected error occurred during signin.");
            }
		}
		finally{
			setIsLoading(false);
		}
	};

	return (
		<div>
			<section className="bg-gray-50 dark:bg-background">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="/"
						className="flex items-center mb-6 text-4xl 3xl:text-5xl font-koulen font-bold text-text"
					>
						MOVIEGIG
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-bglight dark:border-gray-900">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Login to your account
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								action="#"
								onSubmit={handleSubmit}
							>
								<div>
									<label
										htmlFor="username"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										User name
									</label>
									<input
										type="text"
										name="username"
										id="username"
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-text dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Anurag"
										required
										onChange={(e) => setUsername(e.target.value)}
									/>
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
										className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-text dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800"
												required
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="remember"
												className="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div>
									</div>
									<a
										href="/"
										className="text-sm font-medium text-primary hover:underline dark:text-primary"
									>
										Forgot password?
									</a>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-text"
								>
									{isLoading? "Loading...":"Sign in"}
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<Link
										to={"/signup"}
										className="font-medium text-primary hover:underline dark:text-primary"
									>
										Sign up
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

export default Login;
