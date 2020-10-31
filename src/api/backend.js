import axios from "axios";
import getEnvVars from "../../enviroment";

const {api}= getEnvVars();

const instance = axios.create ({
    baseURL:process.env.api
});

export default instance;