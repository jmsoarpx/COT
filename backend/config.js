const fs = require("fs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const config = {
  default: {
    START_MESSAGE: function (port) {
      return `Server running on ${port} as local mode\nPID: ${process.pid}`;
    },
    PORT: process.env.PORT,
    REJECT_UNAUTHORIZED: true,
    SERVER_PARAMS: {
      key: fs.readFileSync("./cert/key.pem"),
      cert: fs.readFileSync("./cert/cert.pem"),
    },
    session_db: "cot_sessions",
    DATABASE: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      url: process.env.DB_URL,
    },
    TIMEZONE: "America/Sao_Paulo",
    ibmid: {
      client_id: process.env.client_id_ibmid,
      client_secret: process.env.client_secret_ibmid,
      authorization_url: process.env.authorization_url_ibmid,
      token_url: process.env.token_url_ibmid,
      issuer_id: process.env.issuer_id_ibmid,
      callback_url: process.env.callback_url_ibmid,
    },
    w3id_dev: {
      apikey: process.env.apikey_w3id_dev,
      appidServiceEndpoint: process.env.appidServiceEndpoint_w3id_dev,
      clientId: process.env.clientId_w3id_dev,
      discoveryEndpoint: process.env.discoveryEndpoint_w3id_dev,
      iam_apikey_description: process.env.iam_apikey_description_w3id_dev,
      iam_apikey_name: process.env.iam_apikey_name_w3id_dev,
      iam_role_crn: process.env.iam_role_crn_w3id_dev,
      iam_serviceid_crn: process.env.iam_serviceid_crn_w3id_dev,
      managementUrl: process.env.managementUrl_w3id_dev,
      oauthServerUrl: process.env.oauthServerUrl_w3id_dev,
      profilesUrl: process.env.profilesUrl_w3id_dev,
      secret: process.env.secret_w3id_dev,
      tenantId: process.env.tenantId_w3id_dev,
      version: process.env.version_w3id_dev,
      redirectUri: process.env.redirectUri_w3id_dev,
    },
    w3id: {
      apikey: process.env.apikey_w3id_dev,
      appidServiceEndpoint: process.env.appidServiceEndpoint_w3id_dev,
      clientId: process.env.clientId_w3id_dev,
      discoveryEndpoint: process.env.discoveryEndpoint_w3id_dev,
      iam_apikey_description: process.env.iam_apikey_description_w3id_dev,
      iam_apikey_name: process.env.iam_apikey_name_w3id_dev,
      iam_role_crn: process.env.iam_role_crn_w3id_dev,
      iam_serviceid_crn: process.env.iam_serviceid_crn_w3id_dev,
      managementUrl: process.env.managementUrl_w3id_dev,
      oauthServerUrl: process.env.oauthServerUrl_w3id_dev,
      profilesUrl: process.env.profilesUrl_w3id_dev,
      secret: process.env.secret_w3id_dev,
      tenantId: process.env.tenantId_w3id_dev,
      version: process.env.version_w3id_dev,
      redirectUri: process.env.redirectUri_w3id_dev,
    },
  },
  development: {
    PORT: process.env.PORT,
    session_db: "cot_sessions",
    DATABASE: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      url: process.env.DB_URL,
    },
    TIMEZONE: "America/Sao_Paulo",
    ibmid: {
      client_id: process.env.client_id_ibmid,
      client_secret: process.env.client_secret_ibmid,
      authorization_url: process.env.authorization_url_ibmid,
      token_url: process.env.token_url_ibmid,
      issuer_id: process.env.issuer_id_ibmid,
      callback_url: process.env.callback_url_ibmid,
    },
    w3id_dev: {
      apikey: process.env.apikey_w3id_dev,
      appidServiceEndpoint: process.env.appidServiceEndpoint_w3id_dev,
      clientId: process.env.clientId_w3id_dev,
      discoveryEndpoint: process.env.discoveryEndpoint_w3id_dev,
      iam_apikey_description: process.env.iam_apikey_description_w3id_dev,
      iam_apikey_name: process.env.iam_apikey_name_w3id_dev,
      iam_role_crn: process.env.iam_role_crn_w3id_dev,
      iam_serviceid_crn: process.env.iam_serviceid_crn_w3id_dev,
      managementUrl: process.env.managementUrl_w3id_dev,
      oauthServerUrl: process.env.oauthServerUrl_w3id_dev,
      profilesUrl: process.env.profilesUrl_w3id_dev,
      secret: process.env.secret_w3id_dev,
      tenantId: process.env.tenantId_w3id_dev,
      version: process.env.version_w3id_dev,
      redirectUri: process.env.redirectUri_w3id_dev,
    },
    w3id: {
      apikey: process.env.apikey_w3id_dev,
      appidServiceEndpoint: process.env.appidServiceEndpoint_w3id_dev,
      clientId: process.env.clientId_w3id_dev,
      discoveryEndpoint: process.env.discoveryEndpoint_w3id_dev,
      iam_apikey_description: process.env.iam_apikey_description_w3id_dev,
      iam_apikey_name: process.env.iam_apikey_name_w3id_dev,
      iam_role_crn: process.env.iam_role_crn_w3id_dev,
      iam_serviceid_crn: process.env.iam_serviceid_crn_w3id_dev,
      managementUrl: process.env.managementUrl_w3id_dev,
      oauthServerUrl: process.env.oauthServerUrl_w3id_dev,
      profilesUrl: process.env.profilesUrl_w3id_dev,
      secret: process.env.secret_w3id_dev,
      tenantId: process.env.tenantId_w3id_dev,
      version: process.env.version_w3id_dev,
      redirectUri: process.env.redirectUri_w3id_dev,
    },
  },
  production: {
    PORT: process.env.PORT,
    session_db: "cot_sessions",
    DATABASE: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      url: process.env.DB_URL,
    },
    TIMEZONE: "America/Sao_Paulo",
    ibmid: {
      client_id: process.env.client_id_ibmid,
      client_secret: process.env.client_secret_ibmid,
      authorization_url: process.env.authorization_url_ibmid,
      token_url: process.env.token_url_ibmid,
      issuer_id: process.env.issuer_id_ibmid,
      callback_url: process.env.callback_url_ibmid,
    },
    w3id: {
      apikey: process.env.apikey_w3id_dev,
      appidServiceEndpoint: process.env.appidServiceEndpoint_w3id_dev,
      clientId: process.env.clientId_w3id_dev,
      discoveryEndpoint: process.env.discoveryEndpoint_w3id_dev,
      iam_apikey_description: process.env.iam_apikey_description_w3id_dev,
      iam_apikey_name: process.env.iam_apikey_name_w3id_dev,
      iam_role_crn: process.env.iam_role_crn_w3id_dev,
      iam_serviceid_crn: process.env.iam_serviceid_crn_w3id_dev,
      managementUrl: process.env.managementUrl_w3id_dev,
      oauthServerUrl: process.env.oauthServerUrl_w3id_dev,
      profilesUrl: process.env.profilesUrl_w3id_dev,
      secret: process.env.secret_w3id_dev,
      tenantId: process.env.tenantId_w3id_dev,
      version: process.env.version_w3id_dev,
      redirectUri: process.env.redirectUri_w3id_dev,
    },
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
