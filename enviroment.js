import Constants from "expo-Constants";

const ENV = {
    dev: {
        api: "https://www.etnassoft.com/api/v1/get/",
        APIKEY : "?id=505"
    },
};

const getEnvVars =(env = Constants.manifest.releaseChannel) => {
    if(__DEV__){
        return ENV.dev;
    }
};

export default getEnvVars;