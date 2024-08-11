import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => {
		return amount + item.amount;
	}, 0);

	return (
		<section className={classes.fixed}>
			<section>
				<div className={classes.header_container}>
					<div className={classes.logo_container}>
						{/* logo section */}
						<Link to="/">
							<img
								src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
								alt="amazon logo"
							/>
						</Link>
						{/* delivery */}
						<div className={classes.delivery}>
							<span>
								<SlLocationPin />
							</span>
							<div>
								<p>Delivered to</p>
								<span>Ethiopia</span>
							</div>
						</div>
					</div>

					{/* search section*/}
					<div className={classes.search}>
						<select name="" id="">
							<option value="">All</option>
						</select>
						<input type="text" name="" id="" placeholder="search product" />
						<CiSearch size={38} />
					</div>
					{/* right side link section*/}
					<div className={classes.order_container}>
						<Link to="" className={classes.language}>
							<img
								src="https://image.shutterstock.com/image-vector/vector-image-american-flag-260nw-157626554.jpg"
								alt=""
							/>
							<select name="" id="">
								<option value="">EN</option>
							</select>
						</Link>
						{/* three components */}
						<Link to={!user && "/auth"}>
							<div>
								{user ? (
									<>
										<p>Hello {user?.email?.split("@")[0]}</p>
										<span onClick={() => auth.signOut()}>Sign Out</span>
									</>
								) : (
									<>
										<p>Hello,sign In</p>
										<span>Account & List</span>
									</>
								)}
							</div>
						</Link>
						{/* orders */}
						<Link to="order">
							<p>returns</p>
							<span>& Orders</span>
						</Link>
						{/* cart */}
						<Link to="cart" className={classes.cart}>
							<CiShoppingCart size={35} />
							<span>{totalItem}</span>
						</Link>
					</div>
				</div>
			</section>
			<LowerHeader />
		</section>
	);
}

export default Header;
