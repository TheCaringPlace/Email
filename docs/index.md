---
title: Home
layout: home
nav_order: 0
---

# Sendra Documentation

Welcome to the Sendra documentation! This comprehensive guide will help you deploy, configure, and use Sendra - the open-source, serverless email platform.

## Overview

Sendra is built on AWS and [SST](https://sst.dev/), providing a cost-effective, scalable email solution for sending transactional emails, creating automations, and managing campaigns. Whether you're deploying your own instance or integrating Sendra into your application, these guides will help you get started.

## Why Sendra?

Sendra came about when MailerLite, which we had been using for emails for our region's Girl Scout Service Unit, lowered their limit for the free account to below our current number of subscribers. 

When searching for other options, nearly every paid option cost at minimum $10 / month and open source options required either self-hosting or provisioning a full VPS which netted out at a similar cost. Initially, we thought [Plunk](https://useplunk.com) would work, however it has gotten very minimal updates and is missing some very important (to us) features. 

After some wresting with the code, we were able to fork and update the Plunk codebase to use AWS DynamoDB and Lambda using SST for a truly serverless solution that was a lot closer to our budget of "free".

The name Sendra is a play on Sender (as in Email Sender) and [Sandra Day O'Conner](https://en.wikipedia.org/wiki/Sandra_Day_O%27Connor) the first female US Supreme Court Justice.

## Topics

- **[Deployment Guide](./setup.html)** - Deploy Sendra to AWS
- **[User Guide](./user-guide.html)** - Learn to use the Sendra app
- **[Entities Reference](./entities.html)** - Understand the data model
- **[API Documentation](./api.html)** - Integrate with your application

### Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Service-Unit-469/Sendra/issues)
- **Contributing**: See [CONTRIBUTING.html](https://github.com/Service-Unit-469/Sendra/blob/main/CONTRIBUTING.md)

### External Resources

- **AWS SES Documentation**: [AWS SES Guides](https://docs.aws.amazon.com/ses/)
- **SST Documentation**: [SST Framework](https://sst.dev/)
