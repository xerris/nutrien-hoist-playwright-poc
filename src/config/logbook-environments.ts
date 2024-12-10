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
      username: 'mine_operator@test.com',
      password: 'Welcome@1'
    }
  },
  staging: {
    baseUrl: 'https://stage-hoist.minesight.nutrien.com/',
    credentials: {
      username: 'stage-user',
      password: 'stage-password'
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
