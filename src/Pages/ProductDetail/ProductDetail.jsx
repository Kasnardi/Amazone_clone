import React from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/EndPoints";
import { useEffect, useState } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/FadeLoader/Loader";

function ProductDetail() {
	const { productId } = useParams();
	const [product, setProduct] = useState({});
	const [Isloading, setIsloading] = useState(false);
	useEffect(() => {
		setIsloading(true);
		axios
			.get(`${ProductUrl}/products/${productId}`)
			.then((res) => {
				setProduct(res.data);
				setIsloading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsloading(false);
			});
	}, []);

	return (
		<Layout>
			{Isloading ? (
				<Loader />
			) : (
				<ProductCard
					product={product}
					flex={true}
					renderDesc={true}
					renderadd={true}
				/>
			)}
		</Layout>
	);
}

export default ProductDetail;
