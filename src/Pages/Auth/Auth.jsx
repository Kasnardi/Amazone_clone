import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState({ signIn: false, signUp: false });

	const [{ user }, dispatch] = useContext(DataContext);
	const navigate = useNavigate();
	const navStateData = useLocation();

	const authHandler = async (e) => {
		e.preventDefault();
		console.log(e.target.name);
		if (e.target.name === "signIn") {
			// firebase auth
			setLoading({ ...loading, signIn: true });
			signInWithEmailAndPassword(auth, email, password)
				.then((userinfo) => {
					console.log(userinfo);
					dispatch({ type: Type.SET_USER, user: userinfo.user });
					setLoading({ ...loading, signIn: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					setError(err.message);
					setLoading({ ...loading, signIn: false });
				});
		} else {
			setLoading({ ...loading, signUp: true });
			createUserWithEmailAndPassword(auth, email, password)
				.then((userinfo) => {
					console.log(userinfo);
					dispatch({ type: Type.SET_USER, user: userinfo.user });
					setLoading({ ...loading, signUp: true });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					console.log(err);
					setError(err.message);
					setLoading({ ...loading, signUp: false });
				});
		}
	};

	// console.log(password, email);
	return (
		<section className={classes.logIn}>
			{/* logo */}
			<Link to="/">
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfj_Mau67ppsi23HF-_HBVSYwvlaG7m7dt2jOMASAATspjnBTsVjDt9AXzU-wIo-NAsA&usqp=CAU"
					alt="logo"
				/>
			</Link>
			{/* form */}
			<div className={classes.logIn_container}>
				<h1>sign In</h1>
				{navStateData?.state?.msg && (
					<small
						style={{
							padding: "5px",
							textAlign: "center",
							color: "red",
							fontWeight: "bold",
						}}
					>
						{navStateData?.state?.msg}
					</small>
				)}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						name="signIn"
						type="submit"
						onClick={authHandler}
						className={classes.logIn_signIn_button}
					>
						{loading.signIn ? (
							<ClipLoader color="#000" size={15}></ClipLoader>
						) : (
							"Sign In"
						)}
					</button>
				</form>
				{/* agreement */}
				<p>
					By signning in you agree to the Amazone fake clone conditions of use &
					sale.Please see our privacy notice and our Internet band add notice.
				</p>
				{/* create account button */}
				<button
					name="signUp"
					type="submit"
					onClick={authHandler}
					className={classes.logIn_register_button}
				>
					{loading.signUp ? (
						<ClipLoader color="#000" size={15}></ClipLoader>
					) : (
						"Create your Amazon account"
					)}
				</button>
				{error && (
					<small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</section>
	);
}

export default Auth;
