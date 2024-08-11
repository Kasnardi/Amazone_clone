import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../FadeLoader/Loader";

function Product() {
	const [products, setProducts] = useState();
	const [Isloading, setIsloading] = useState(false);
	useEffect(() => {
		axios
			.get("https://fakestoreapi.com/products")
			.then((res) => {
				setProducts(res.data);
				setIsloading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsloading(false);
			});
	}, []);
	return (
		<>
			{Isloading ? (
				<Loader />
			) : (
				<section className={classes.products_container}>
					{products?.map((singleProduct) => {
						return (
							<ProductCard
								renderadd={true}
								product={singleProduct}
								key={singleProduct.id}
							/>
						);
					})}
				</section>
			)}
		</>
	);
}

export default Product;
