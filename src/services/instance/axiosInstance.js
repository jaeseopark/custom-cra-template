import axios from "axios";

const instance = axios.create({
	baseURL: "https://www.google.com/",
});

instance.defaults.headers.common["Authorization"] =
	"Token token=y_NbAkKc66ryYTWUXYEu";

export default instance;
