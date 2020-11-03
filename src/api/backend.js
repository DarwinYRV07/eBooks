
import axios from "axios";

import getEnvVars from "../../enviroment";

const {url}= getEnvVars();

const instance = axios.create ({

    baseURL: url
});

export default instance;