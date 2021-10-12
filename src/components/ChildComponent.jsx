import React, { useContext } from "react";
import { MainContext } from "src/context/Store";

const ChildComponent = () => {
	const { store } = useContext(MainContext);
	return (
		<div>
			Hello Pagerduty
			{store.abilities}
		</div>
	);
};

export default ChildComponent;
