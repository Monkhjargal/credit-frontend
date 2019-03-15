import config from "../config";

const API =
  process.env.NODE_ENV === "development"
    ? config.api.development
    : config.api.production;
const VERSION = config.api.version;

export default [
  {
    NAME: "homepage",
    METHOD: "GET",
    URL: `${API}/${VERSION}/service-users/login`
  }
];
