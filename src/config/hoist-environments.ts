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
    baseUrl: 'https://dev.minesight.nutrien.com/',
    credentials: {
      username: 'dev-user',
      password: 'dev-password',
    },
  },
  staging: {
    baseUrl: 'https://stage.minesight.nutrien.com/',
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
