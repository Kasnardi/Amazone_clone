import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Order from "./Pages/Orders/Order";
import Cart from "./Pages/Cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Results from "./Pages/Results/Results";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Protectedroute from "./Components/ProtectedRoute/Protectedroute";
const stripePromise = loadStripe(
	"pk_test_51PftoFRxLcTF9AROw7uRLJUOoVX7KqcVpEjHsK7GtgEVms5Gmc85ydg3Rxi9tRcB4oUoY8msIoIUeLUHzDVuJOVc00exPp4c3F"
);

function Routers() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/Auth" element={<Auth />} />
				<Route
					path="/payment"
					element={
						<Protectedroute
							msg={"you must log In to pay"}
							redirect={"/payment"}
						>
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						</Protectedroute>
					}
				/>
				<Route
					path="/orders"
					element={
						<Protectedroute
							msg={"you must log In to see order"}
							redirect={"/orders"}
						>
							<Order />
						</Protectedroute>
					}
				/>
				<Route path="/category/:categoryName" element={<Results />} />
				<Route path="/products/:productId" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default Routers;
