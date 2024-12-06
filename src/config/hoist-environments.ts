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
      username: 'greg.cook@nutrien.com',
      password: 'iH62k6Ejf2Ahrqjz'
    }
  },
  staging: {
    baseUrl: 'https://stage.minesight.nutrien.com/',
    credentials: {
      username: 'greg.cook@nutrien.com',
      password: 'iH62k6Ejf2Ahrqjz'
    }
  }
  // production: {
  //   baseUrl: 'whatever-the-url-is',
  //   credentials: {
  //     username: 'prod-user',
  //     password: 'prod-password'
  //   }
  // }
};
