/// <reference path="../.sst/platform/config.d.ts" />

export const emailTopic = new sst.aws.SnsTopic("EmailTopic");

emailTopic.subscribe("EmailTopicSubscriber", {
  handler: "packages/subscribers/src/EmailTopicSubscriber.handler",
  timeout: "15 minutes",
  logging: {
    retention: "1 week",
  },
});

export const configurationSet: aws.ses.ConfigurationSet =
  new aws.ses.ConfigurationSet("EmailConfigurationSet", {
    name: "EmailConfigurationSet",
  });

export const eventDestination: aws.ses.EventDestination =
  new aws.ses.EventDestination("EmailConfigurationSetDestination", {
    name: "EmailConfigurationSetDestination",
    configurationSetName: configurationSet.name,
    enabled: true,
    matchingTypes: ["send", "bounce", "complaint", "delivery", "open", "click"],
    snsDestination: {
      topicArn: emailTopic.arn,
    },
  });
