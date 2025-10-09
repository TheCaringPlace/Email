export class Tasks {
  public async handleTasks() {
    // TODO: Implement task scanning for DynamoDB
    // For now, this method is disabled as it requires a scan operation
    // In production, you might want to add a GSI for tasks with runBy timestamps

    return;

    // const tasks = await DynamoDBService.scan({
    //   FilterExpression: 'runBy <= :now',
    //   ExpressionAttributeValues: { ':now': new Date().toISOString() }
    // });

    // for (const task of tasks) {
    // 	const { action, campaign, contact } = task;

    // 	const project = await ProjectService.id(contact.projectId);

    // 	// If the project does not exist or is disabled, delete all tasks
    // 	if (!project) {
    // 		// TODO: Implement task deletion for DynamoDB
    // 		continue;
    // 	}

    // 	let subject = "";
    // 	let body = "";

    // 	let email = "";
    // 	let name = "";

    // 	if (action) {
    // 		const { template, notevents } = action;

    // 		if (notevents.length > 0) {
    // 			const triggers = await ContactService.triggers(contact.id);
    // 			if (notevents.some((e) => triggers.some((t) => t.contactId === contact.id && t.eventId === e.id))) {
    // 				await DynamoDBService.delete(DynamoKeys.task(task.id));
    // 				continue;
    // 			}
    // 		}

    // 		email = project.verified && project.email ? template.email ?? project.email : "no-reply@useplunk.dev";
    // 		name = template.from ?? project.from ?? project.name;

    // 		({ subject, body } = EmailService.format({
    // 			subject: template.subject,
    // 			body: template.body,
    // 			data: {
    // 				plunk_id: contact.id,
    // 				plunk_email: contact.email,
    // 				...JSON.parse(contact.data ?? "{}"),
    // 			},
    // 		}));
    // 	} else if (campaign) {
    // 		email = project.verified && project.email ? campaign.email ?? project.email : "no-reply@useplunk.dev";
    // 		name = campaign.from ?? project.from ?? project.name;

    // 		({ subject, body } = EmailService.format({
    // 			subject: campaign.subject,
    // 			body: campaign.body,
    // 			data: {
    // 				plunk_id: contact.id,
    // 				plunk_email: contact.email,
    // 				...JSON.parse(contact.data ?? "{}"),
    // 			},
    // 		}));
    // 	}

    // 	const { messageId } = await EmailService.send({
    // 		from: {
    // 			name,
    // 			email,
    // 		},
    // 		to: [contact.email],
    // 		content: {
    // 			subject,
    // 			html: EmailService.compile({
    // 				content: body,
    // 				footer: {
    // 					unsubscribe: campaign ? true : !!action && action.template.type === "MARKETING",
    // 				},
    // 				contact: {
    // 					id: contact.id,
    // 				},
    // 				project: {
    // 					name: project.name,
    // 				},
    // 				isHtml: (campaign && campaign.style === "HTML") ?? (!!action && action.template.style === "HTML"),
    // 			}),
    // 		},
    // 	});

    // 	const emailData: {
    // 		messageId: string;
    // 		contactId: string;
    // 		actionId?: string;
    // 		campaign?: string;
    // 	} = {
    // 		messageId,
    // 		contactId: contact.id,
    // 	};

    // 	if (action) {
    // 		emailData.actionId = action.id;
    // 	} else if (campaign) {
    // 		emailData.campaign = campaign.id;
    // 	}

    // 	// Create email in DynamoDB
    // 	const emailId = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // 	const email = {
    // 		PK: `${ENTITY_TYPES.EMAIL}#${emailId}`,
    // 		SK: 'PROFILE',
    // 		id: emailId,
    // 		...emailData,
    // 		status: 'SENT',
    // 		createdAt: new Date().toISOString(),
    // 		updatedAt: new Date().toISOString(),
    // 		// GSI keys
    // 		RelatedEntitiesIndexPK: `${ENTITY_TYPES.CONTACT}#${contact.id}`,
    // 		RelatedEntitiesIndexSK: `${ENTITY_TYPES.EMAIL}#${emailId}`,
    // 	};
    // 	await DynamoDBService.put(email);

    // 	await DynamoDBService.delete(DynamoKeys.task(task.id));

    // 	signale.success(`Task completed for ${contact.email} from ${project.name}`);
    // }
  }
}
