// import React from "react";
// import classes from "./Category.module.css";

// function CategoryCard({ data }) {
// 	return (
// 		<div className={classes.category}>
// 			<a href="">
// 				<span>
// 					<h2>{data?.title}</h2>
// 				</span>
// 				<img src={data?.imglink} alt="#" />
// 				<p>shop now</p>
// 			</a>
// 		</div>
// 	);
// }

// export default CategoryCard;

import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
	console.log(data);
	return (
		<div className={classes.category}>
			<Link to={`/category/${data.name}`}>
				<span>
					<h2>{data?.title}</h2>
				</span>
				<img src={data?.imglink} alt="#" />
				<p>shop now</p>
			</Link>
		</div>
	);
}

export default CategoryCard;
