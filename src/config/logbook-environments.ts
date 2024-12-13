export interface EnvironmentConfig {
  baseUrl: string;
  apiUrl?: string;
  credentials?: {
    username?: string;
    password?: string;
  };
}

export const environments: Record<string, EnvironmentConfig> = {
  development: {
    baseUrl: 'https://dev-hoist.minesight.nutrien.com/',
    credentials: {
      username: process.env.LOGBOOK_USERNAME ?? 'dev-user',
      password: process.env.LOGBOOK_PASSWORD ?? 'dev-password',
    },
  },
  staging: {
    baseUrl: 'https://stage-hoist.minesight.nutrien.com/',
    credentials: {
      username: 'stage-user',
      password: 'stage-password',
    },
  },
  // production: {
  //   baseUrl: 'whatever-the-url-is',
  //   credentials: {
  //     username: 'prod-user',
  //     password: 'prod-password'
  //   }
  // }
};
