import dotenv from 'dotenv';

if (!process.env.CI) {
  dotenv.config({ path: '.env' });
}

const getWorldParams = () => {
  const params = {
    foo: 'bar'
  };

  return params;
};

const config = {
  import: ['src/**/*.ts'],
  format: [
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar'
  ],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
  headless: process.env.CI ? true : false,
};

if (process.env.USE_ALLURE) {
  config.format.push('./src/support/reporters/allure-reporter.ts');
} else {
  config.format.push('@cucumber/pretty-formatter');
}
export default config;
