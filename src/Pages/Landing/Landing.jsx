import React from "react";
import Layout from "../../Components/Layout/Layout";
import Carousell from "../../Components/Carousell/Carousell";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";

function Landing() {
	return (
		<Layout>
			<Carousell />
			<Category />
			<Product />
		</Layout>
	);
}

export default Landing;
