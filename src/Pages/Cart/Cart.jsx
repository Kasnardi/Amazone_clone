import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Cart() {
	const [{ basket, user }, dispatch] = useContext(DataContext);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);
	const increment = (item) => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item,
		});
	};
	const decrement = (id) => {
		dispatch({
			type: Type.REMOVE_FROM_BASKET,
			id,
		});
	};

	return (
		<Layout>
			<section className={classes.container}>
				<div className={classes.cart_container}>
					<h2>Hello</h2>
					<h3>Your shoping basket</h3>
					<hr />
					{basket?.length == 0 ? (
						<p>opps! No item in your cart</p>
					) : (
						basket?.map((item, i) => {
							return (
								<section className={classes.cart_product}>
									<ProductCard
										key={i}
										product={item}
										renderDesc={true}
										renderadd={false}
										flex={true}
									/>
									<div className={classes.btn_container}>
										<button
											className={classes.btn}
											onClick={() => increment(item)}
										>
											<MdOutlineKeyboardArrowUp />
										</button>
										<span>{item.amount}</span>
										<button
											className={classes.btn}
											onClick={() => decrement(item.id)}
										>
											<MdOutlineKeyboardArrowDown />
										</button>
									</div>
								</section>
							);
						})
					)}
				</div>
				{basket?.length !== 0 && (
					<div className={classes.subtotal}>
						<div>
							<p>subtotal({basket?.length} items)</p>
							<CurrencyFormat amount={total} />
						</div>
						<span>
							<input type="checkbox" />
							<small>This order contains a gift</small>
						</span>
						<Link to="/payment">Continue to checkout</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}

export default Cart;
