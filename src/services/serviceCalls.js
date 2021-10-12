import instance from "./instance/axiosInstance";

function getAbilities() {
	return instance.get("/abilities");
}

export { getAbilities };
