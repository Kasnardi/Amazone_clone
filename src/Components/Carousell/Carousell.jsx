import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousell.module.css";

function Carousell() {
	return (
		<div>
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				showIndicator={false}
				showThumbs={false}
			>
				{img.map((imageItemLink, index) => {
					return (
						<div key={index}>
							<img src={imageItemLink} />
						</div>
					);
				})}
			</Carousel>
			<div className={classes.hero_img}></div>
		</div>
	);
}

export default Carousell;
