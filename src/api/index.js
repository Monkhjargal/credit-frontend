import client, { setAuthorizationHeader } from "./client";
import homepage from "./Homepage";
let rest = {};

const generateURL = (method, url, replace, data) => {
  if (!replace) return url;
  let tmpURL = url;
  let tmp = replace.replace(/ /g, "").split(",");
  tmp.forEach(s => {
    tmpURL = tmpURL.replace(`:${s}`, data && data[s] ? data[s] : "");
  });
  return tmpURL;
};

const generateAPI = (api, data) => {
  let config = {
    method: api.METHOD,
    url: generateURL(api.METHOD, api.URL, api.REPLACE, data),
    headers: {
      "Content-Type": api.CONTENT_TYPE ? api.CONTENT_TYPE : "application/json"
    }
  };
  config[api.METHOD === "GET" ? "params" : "data"] = data;
  return client(config).then(res => res.data);
};

// homepage
rest["homepage"] = {};
homepage.forEach(api => {
  rest.homepage[api.NAME] = data => generateAPI(api, data);
});

// console.log('rest: ', rest);

export { rest as default, setAuthorizationHeader };
