/* eslint-disable security/detect-non-literal-regexp */
import * as redisStore from 'cache-manager-redis-store';
import * as redis from 'redis';

require('dotenv').config();

const commonEnv = {
  timeZone: 'Asia/Hanoi',

  applicationMode: process.env.APPLICATION_MODE || 'api',

  oldSystemUrl: {
    baseUrl: 'https://for-crypto.com/',
    largeSize: 'large',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    isEnabled:
      process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucket: process.env.AWS_BUCKET || 'static-dev.RedPlate.com',
      cacheControl: 'max-age=31536000',
      domain:
        process.env.AWS_BUCKET_DOMAIN ||
        'static-dev.RedPlate.com.s3-ap-southeast-1.amazonaws.com',
      presignedUrlExparation: 3600,
    },
  },

  static: {
    name: 'upload',
    basePath: 'dist/upload',
  },

  hashids: {
    salt: process.env.HASHIDS_SALT || 'l7y4hac4JHaiBkrd52aDASvZSI42vh3J',
    length: 10,
  },

  swagger: {
    path: '/_swagger',
  },

  server: {
    host: process.env.HOST || '0.0.0.0',
    domainURL: process.env.DOMAIN_URL || 'http://localhost:8000',
    port: process.env.PORT || 8000,
  },

  jwt: {
    expiration: 60 * 60 * 3, // 3 hours
    rememberMe: 24 * 60 * 60 * 7, // 7 days
    issuer: process.env.HOST || 'localhost',
    audience: 'crypto_calculator',
    secretKey: process.env.JWT_SECRET_KEY || '3FfkCtArlgOlvorsG7H8Q6J1YPzWYKXk',
    refreshTokenTTL: 3600 * 24 * 90, // 90 days
    refreshTokenKeyPrefix: 'refresh_token',
  },

  /**
   * rate limit (200 per 10 sec)
   */
  rateLimit: {
    type: 'Memory',
    points: 200, // number of count which you can consume during the period
    duration: 10, // time when refreshing points
    pointsConsumed: 1, // point per consuming
    keyPrefix: 'rate_limit',
  },

  /**
   * login attempt (10 per 5 mins)
   */
  loginAttemptsRateLimit: {
    type: 'Memory',
    points: 10, // number of count which you can consume during the period
    duration: 60 * 5, // time when refreshing points
    pointsConsumed: 1, // point per consuming
    keyPrefix: 'login_attempts',
  },

  appUrl: {
    frontendUrl: process.env.FRONTEND_URL || 'localhost',
    adminConsoleUrl: process.env.ADMIN_CONSOLE_URL || 'localhost',
    portalUrl: process.env.PORTAL_URL || 'localhost',
  },

  // use memory cache by default
  cache: {
    ttl: 60 * 5, //5 mins
  },
};

export const environment = (() => {
  if (process.env.PLATFORM === 'aws') {
    const additionalRateLimitOptions = (() => {
      if (
        process.env.CACHE_DRIVER === 'redis' &&
        process.env.CACHE_REDIS_HOST &&
        process.env.CACHE_REDIS_PORT
      ) {
        const redisClient = redis.createClient({
          host: process.env.CACHE_REDIS_HOST,
          port: process.env.CACHE_REDIS_PORT,
          enable_offline_queue: false,
        });

        return {
          type: 'Redis',
          storeClient: redisClient,
        };
      } else {
        return {};
      }
    })();

    return {
      ...commonEnv,
      ...{
        // override
        email: {
          transport: {
            host:
              process.env.AWS_SMTP_HOST ||
              'email-smtp.ap-south-1.amazonaws.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.AWS_SMTP_USERNAME,
              pass: process.env.AWS_SMTP_PASSWORD,
            },
          },
          defaults: {
            from: 'Crypto <no-reply@crypto.com>',
          },
          templateDir: '/dist/assets/email-templates',
        },

        // override
        cache: (() => {
          if (
            process.env.CACHE_DRIVER === 'redis' &&
            process.env.CACHE_REDIS_HOST &&
            process.env.CACHE_REDIS_PORT
          ) {
            return {
              ttl: 60 * 5, //5 mins
              store: redisStore,
              host: process.env.CACHE_REDIS_HOST,
              port: process.env.CACHE_REDIS_PORT,
            };
          } else {
            return {
              ttl: 60 * 5, //5 mins
            };
          }
        })(),

        // override
        rateLimit: {
          ...commonEnv.rateLimit,
          ...additionalRateLimitOptions,
        },

        // override
        loginAttemptsRateLimit: {
          ...commonEnv.loginAttemptsRateLimit,
          ...additionalRateLimitOptions,
        },
      },
    };
  } else {
    return commonEnv;
  }
})();
