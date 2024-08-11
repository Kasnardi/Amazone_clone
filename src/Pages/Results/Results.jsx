import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../Api/EndPoints";
import ProductCard from "../../Components/Product/ProductCard";

function Results() {
	const [results, setResults] = useState([]);
	const { categoryName } = useParams();
	console.log(categoryName);
	useEffect(() => {
		axios
			.get(`${ProductUrl}/products/category/${categoryName}`)
			.then((res) => {
				setResults(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout>
			<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}> category/{categoryName}</p>
				<hr />
				<div className={classes.products_container}>
					{results?.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							renderDesc={false}
							renderadd={true}
						/>
					))}
				</div>
			</section>
		</Layout>
	);
}

export default Results;
