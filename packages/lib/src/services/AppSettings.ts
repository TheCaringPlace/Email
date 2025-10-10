import { z } from "zod";

const TTLSchema = z.union([z.number(), z.string().regex(/^\d+ (Y|W|D|H|M|s|Ms)$/)]);

const EnvSettingsSchemas = z
  .object({
    API_URL: z.url().default("http://localhost:4000"),
    APP_URL: z.url().default("http://localhost:3000"),
    AUTH_ISSUER: z.string().default("sendra"),
    AUTH_TTL_SECRET: TTLSchema.default("90 D"),
    AUTH_TTL_PUBLIC: TTLSchema.default("265 D"),
    AUTH_TTL_USER: TTLSchema.default("2 H"),
    AUTH_COOKIE_NAME: z.string().default("token"),
    DEFAULT_EMAIL: z.email(),
    DISABLE_SIGNUPS: z.boolean().default(false),
    EMAIL_CONFIGURATION_SET_NAME: z.string(),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
    LOG_PRETTY: z.boolean().default(false),
    JWT_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production"]).default("production"),
  })
  .transform((env) => ({
    appSettings: {
      apiUri: env.API_URL,
      appUri: env.APP_URL,
      defaultEmail: env.DEFAULT_EMAIL,
      emailConfigurationSetName: env.EMAIL_CONFIGURATION_SET_NAME,
      env: env.NODE_ENV,
    },
    authConfig: {
      jwtSecret: env.JWT_SECRET,
      issuer: env.AUTH_ISSUER,
      ttl: {
        secret: env.AUTH_TTL_SECRET,
        public: env.AUTH_TTL_PUBLIC,
        user: env.AUTH_TTL_USER,
      },
      cookieName: env.AUTH_COOKIE_NAME,
      disableSignups: env.DISABLE_SIGNUPS,
    },
    logConfig: {
      level: env.LOG_LEVEL,
      pretty: env.LOG_PRETTY,
    },
  }));

const settings = EnvSettingsSchemas.parse(process.env);

const { appSettings, authConfig, logConfig } = settings;

export { appSettings, authConfig, logConfig };
