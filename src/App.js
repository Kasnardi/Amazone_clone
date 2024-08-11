// import "./App.css";
// import React from "react";
// import Header from "./Components/Header/Header";
// import Carousell from "./Components/Carousell/Carousell";
// import Category from "./Components/Category/Category";
// import Product from "./Components/Product/Product";

// function App() {
// 	return (
// 		<>
// 			<Header />
// 			<Carousell />
// 			<Category />
// 			<Product />
// 		</>
// 	);
// }

// export default App;
import React, { useContext, useEffect } from "react";
import Routers from "./Router.jsx";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/firebase.js";

function App() {
	const [{ user }, dispatch] = useContext(DataContext);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({ type: Type.SET_USER, user: authUser });
			} else {
				dispatch({ type: Type.SET_USER, user: null });
			}
		});
	}, []);

	return <Routers />;
}

export default App;
