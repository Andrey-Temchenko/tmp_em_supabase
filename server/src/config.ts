import pathHelper from './helpers/pathHelper';
import configBuilder from './helpers/configHelper';

let config = {
  port: 3000,
  isDevLocal: process.env.NODE_ENV !== 'production',
  appVersion: '0.0.1',
  rootUrl: 'http://localhost:3000',
  database: {
    supabaseUrl: '',
    supabaseKey: '',
    supabaseServiceRole: ''
  }
};

//TODO fix
//define ENV VARs which override all other values if defined
let envVars = {
  rootUrl: 'ROOT_URL'
};

configBuilder.addJsonFile(config, pathHelper.getDataRelative('config.json'), true);

configBuilder.addJsonFile(config, pathHelper.getLocalRelative('config.local.json'));

configBuilder.loadEnvVars(config, envVars);

if (config.isDevLocal) {
  configBuilder.printConfig(config);
}

export default config;
