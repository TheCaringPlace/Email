import { dynamo } from "./dynamo";
import { passEnvironmentVariables } from "./env";
import { jwtSecret } from "./secrets";
import { delayedTaskStateMachine, taskQueue } from "./task-queue";

export const api = new sst.aws.Function("Api", {
  url: {
    cors: false,
  },
  handler: "packages/api/src/app.handler",
  link: [dynamo, taskQueue, delayedTaskStateMachine, jwtSecret],
  logging: {
    retention: "1 week",
  },
  environment: {
    EMAIL_CONFIGURATION_SET_NAME: `SendraConfigurationSet-${$app.stage}`,
    ...passEnvironmentVariables([
      "LOG_LEVEL",
      "LOG_PRETTY",
      "DEFAULT_EMAIL",
      "APP_URL",
      "AUTH_ISSUER",
      "AUTH_TTL_SECRET",
      "AUTH_TTL_PUBLIC",
      "AUTH_TTL_USER",
      "DISABLE_SIGNUPS",
    ]),
  },
  nodejs: {
    loader: {
      ".html": "file",
    },
  },
  permissions: [
    {
      actions: [
        "ses:SendEmail",
        "ses:SendRawEmail",
        "ses:VerifyDomainDkim",
        "ses:GetIdentityVerificationAttributes",
        "ses:SetIdentityMailFromDomain",
        "ses:GetIdentityDkimAttributes",
        "ses:VerifyEmailAddress",
        "ses:VerifyEmailIdentity",
      ],
      resources: ["*"],
    },
  ],
});
