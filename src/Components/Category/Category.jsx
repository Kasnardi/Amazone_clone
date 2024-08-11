import React from "react";
import { CategoryInf } from "./CategoryInfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
	return (
		<section className={classes.category_container}>
			{CategoryInf?.map((infos) => {
				return <CategoryCard data={infos} key={infos.id} />;
				console.log(infos);
			})}
		</section>
	);
}

export default Category;
