module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      //this rule is for importing graphql files
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.scss$/,
          //rules for adding variables auto to any .scss file
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./styles/shared/_variables.scss']
              }
            }
          ]
        }
      ]
    });

    return config;
  },
  //redirect to diffent pages after searching manually to a path
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/search',
        permanent: true
      },
      {
        source: '/dashboard/search',
        destination: '/dashboard/search/youtube',
        permanent: true
      },
      {
        source: '/dashboard/request',
        destination: '/dashboard/request/create',
        permanent: true
      },
      {
        source: '/dashboard/credit',
        destination: '/dashboard/credit/add',
        permanent: true
      },
      {
        source: '/dashboard/settings',
        destination: '/dashboard/settings/profile',
        permanent: true
      }
    ];
  },

  //doamins for images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  //used for login proxy server
  async rewrites() {
    return [
      {
        source: '/google',
        destination: process.env.GOOGLE_SIGNUP_URL
      },
      {
        source: '/payment',
        destination: process.env.PAYMENT_URL
      },
      {
        source: '/payment/process',
        destination: process.env.PAYMENT_URL
      },
      {
        source: '/google/redirect',
        destination: process.env.GOOGLE_REDIRECT_URL
      }
    ];
  }

  //add custom  env file if needed
  // env: {
  //   customKey: 'my-value'
  // }
};
