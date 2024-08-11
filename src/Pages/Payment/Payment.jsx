import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => {
		return amount + item.amount;
	}, 0);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);
	const [cardError, setCardError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const handleChange = (e) => {
		e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
	};
	const handlePayment = async (e) => {
		e.preventDefault();

		try {
			setProcessing(true);
			// 1.backend ||functions--->contact the client secret
			const response = await axiosInstance({
				method: "POST",
				url: `/payment/create?total=${total * 100}`,
			});
			console.log(response.data);
			const clientsecret = response.data?.clientsecret;
			// 2. client side || (reactside confirmation)
			const { paymentIntent } = await stripe.confirmCardPayment(clientsecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			// console.log(confirmation);
			// 3. after the confirmation-->order the firestore database BiSave,clear basket.BiSave
			await db
				.collection("users")
				.doc(user.uid)
				.collection("orders")
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				});

			// 4. clear the basket
			// dispatch({ type: Type.EMPTY_BASKET });
			setProcessing(false);
			navigate("/orders", { state: { msg: "you have placed new order" } });
		} catch (error) {
			console.log(error);
			setProcessing(false);
		}
	};

	return (
		<Layout>
			{/* Header */}
			<div className={classes.payment_header}>Checkout ({totalItem})items</div>
			{/* payment method */}
			<section className={classes.payment}>
				{/* address */}
				<div className={classes.flex}>
					<h3>Delivery Address</h3>
				</div>
				<div>Kasiye</div>
				<div>5909 begonia</div>
				<div>Texas</div>
				<hr />

				{/* product */}
				<div className={classes.flex}>
					<h3>Review items and delivery</h3>
					<div>
						{basket?.map((item) => (
							<ProductCard product={item} flex={true} />
						))}
					</div>
				</div>

				<hr />

				{/* card form */}
				<div className={classes.flex}>
					<h3>Payment methods</h3>
					<div className={classes.payment_card_container}>
						<div className={classes.payment_details}>
							<form onSubmit={handlePayment} action="">
								{/* error */}
								{cardError && (
									<small style={{ color: "red" }}>{cardError}</small>
								)}
								{/* card Element */}
								<CardElement onChange={handleChange} />
								{/* price */}
								<div className={classes.payment_price}>
									<div>
										<span style={{ display: "flex", gap: "10px" }}>
											<p>Total order |</p>
											<CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">
										{processing ? (
											<div className={classes.loading}>
												<ClipLoader color="gray" size={12} />
												<p>Please wait ...</p>
											</div>
										) : (
											"Pay Now"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default Payment;
