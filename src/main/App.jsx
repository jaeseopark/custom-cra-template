import React from "react";
import { MainContextProvider } from "src/context/Store";
import { getAbilities } from "src/services/serviceCalls";

import ChildComponent from "src/components/ChildComponent";
import SiblingComponent from "src/components/SiblingComponent";

import "src/styles/App.scss";

const App = () => {
	getAbilities();

	return (
		<div className="App">
			<MainContextProvider>
				<ChildComponent />
				<SiblingComponent />
			</MainContextProvider>
		</div>
	);
};

export default App;
