import React, { useContext } from "react";
import REDUCER_ACTIONS from "src/constants/ActionTypes";
import { MainContext } from "src/context/Store";
import { getAbilities } from "src/services/serviceCalls";

const SiblingComponent = () => {
	const { dispatch } = useContext(MainContext);

	async function handleSiblingClick() {
		const data = await getAbilities();

		dispatch({
			type: REDUCER_ACTIONS.ABILITIES,
			payload: data.data.abilities,
		});
	}

	return <button onClick={handleSiblingClick}>Hello Sibling</button>;
};

export default SiblingComponent;
