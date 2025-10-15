import { SES } from "@aws-sdk/client-ses";
import type { ProjectIdentity } from "@sendra/shared";

export const ses = new SES();

export const getIdentities = async (identities: string[]) => {
  const res = await ses.getIdentityVerificationAttributes({
    Identities: identities.flatMap((identity) => [identity.split("@")[1]]),
  });

  const parsedResult = Object.entries(res.VerificationAttributes ?? {});
  return parsedResult.map((obj) => {
    return { email: obj[0], status: obj[1].VerificationStatus };
  });
};

export const verifyIdentity = async ({ identity, identityType, mailFromDomain }: Omit<ProjectIdentity, "verified">) => {
  if (identityType === "email") {
    await ses.verifyEmailIdentity({
      EmailAddress: identity,
    });
    return [];
  }

  const DKIM = await ses.verifyDomainDkim({
    Domain: identity,
  });

  if (mailFromDomain) {
    await ses.setIdentityMailFromDomain({
      Identity: identity,
      MailFromDomain: mailFromDomain,
    });
  }

  return DKIM.DkimTokens;
};

export const getIdentityVerificationAttributes = async (email: string) => {
  const attributes = await ses.getIdentityDkimAttributes({
    Identities: [email, email.split("@")[1]],
  });

  const parsedAttributes = Object.entries(attributes.DkimAttributes ?? {});

  return {
    email: parsedAttributes[0][0],
    tokens: parsedAttributes[0][1].DkimTokens,
    status: parsedAttributes[0][1].DkimVerificationStatus,
  };
};
