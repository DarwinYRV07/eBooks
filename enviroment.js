
import Constants from 'expo-constants';

const ENV = {
    dev: {
        url: "https://www.etnassoft.com/api/v1/",
        apiCoverUrl: "http://collection.openlibra.com.s3.amazonaws.com/covers/",
        apiCoverSize: "350x459",
    },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    if(__DEV__){
        return ENV.dev;
    }
};

export default getEnvVars;