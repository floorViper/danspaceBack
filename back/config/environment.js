const environments = {
  development: {
    backendHost: 'localhost:3000',
    domain: 'localhost',
    mysql: {
      username: 'root',
      password: '132132',
      database: 'danspace',
      host: 'localhost',
      dialect: 'mysql'
    },
    facebook: {
      clientID: '2125086734395807',
      clientSecret: '8740707481219e4f6add1c386ec9b23b'
    }
  },

  test: {
    mysql: {
      username: 'root',
      password: '132132',
      database: 'danspace'
    }
  },
  production: {
    backendHost: 'api.viperbit.xyz',
    domain: 'viperbit.xyz',
    mysql: {
      username: 'viper',
      password: 'rltjd132',
      database: 'nodeapi',
      host: 'viper.cuw1jjsaz4tk.ap-northeast-2.rds.amazonaws.com',
      dialect: 'mysql'
    },
    facebook: {
      clientID: '779847772206191',
      clientSecret: '55c528c4e9f8ff356e33a368de3da0af'
    }
  }
};
const nodeEnv = process.env.NODE_ENV || 'development';
module.exports = environments[nodeEnv];
