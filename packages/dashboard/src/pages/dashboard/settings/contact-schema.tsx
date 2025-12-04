import { jsonLanguage } from "@codemirror/lang-json";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import toJsonSchema from "to-json-schema";
import { BlackButton } from "../../../components/Buttons/BlackButton";
import { DangerButton } from "../../../components/Buttons/DangerButton";
import Card from "../../../components/Card/Card";
import { FieldTemplate } from "../../../components/ContactForm/SchemaDrivenForm";
import { StyledLabel } from "../../../components/Label/StyledLabel";
import SettingTabs from "../../../components/Navigation/SettingTabs/SettingTabs";
import FullscreenLoader from "../../../components/Utility/FullscreenLoader/FullscreenLoader";
import { useContacts } from "../../../lib/hooks/contacts";
import { useCurrentProject, useProjects } from "../../../lib/hooks/projects";
import { network } from "../../../lib/network";

/**
 *
 */
export default function ContactSchemaPage() {
  const project = useCurrentProject();
  const { mutate: projectsMutate } = useProjects();
  const [schemaText, setSchemaText] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [schema, setSchema] = useState<object | null>(null);
  const { data: contacts } = useContacts();

  useEffect(() => {
    try {
      setSchema(JSON.parse(schemaText));
      setError(null);
    } catch (error) {
      setError(error as Error);
      setSchema(null);
    }
  }, [schemaText]);

  useEffect(() => {
    const { contactDataSchema } = project ?? {};
    if (contactDataSchema) {
      try {
        const parsed = JSON.parse(contactDataSchema);
        setSchemaText(JSON.stringify(parsed, null, 2));
      } catch {
        setSchemaText(contactDataSchema);
      }
    } else {
      setSchemaText("{}");
    }
  }, [project]);

  if (!project || !contacts) {
    return <FullscreenLoader />;
  }

  const loadSchemaFromFirstContact = () => {
    const contactData = contacts?.[0]?.items[0]?.data;
    if (contactData) {
      const schema = toJsonSchema(contactData, {
        required: false,
      });
      setSchemaText(JSON.stringify(schema, null, 2));
    }
  };

  const removeSchema = () => {
    toast.promise(
      network
        .fetch(`/projects/${project.id}`, {
          method: "PUT",
          body: {
            id: project.id,
            name: project.name,
            url: project.url,
            colors: project.colors,
          },
        })
        .then(() => {
          void projectsMutate();
        }),
      {
        loading: "Removing contact data schema",
        success: "Removed contact data schema",
        error: "Could not remove contact data schema",
      },
    );
  };

  const update = async () => {
    // Validate JSON before submitting
    let parsedSchema: object;
    try {
      parsedSchema = JSON.parse(schemaText);
    } catch (error) {
      console.error("Invalid JSON schema format", error);
      toast.error(`Invalid JSON schema format: ${(error as Error).message}`);
      return;
    }

    toast.promise(
      network.fetch(`/projects/${project.id}`, {
        method: "PUT",
        body: {
          id: project.id,
          name: project.name,
          url: project.url,
          colors: project.colors,
          contactDataSchema: JSON.stringify(parsedSchema),
        },
      }),
      {
        loading: "Updating contact data schema",
        success: "Updated contact data schema",
        error: "Could not update contact data schema",
      },
    );

    await projectsMutate();
  };

  return (
    <>
      <SettingTabs />
      <Card title="Contact Data Schema" description="Define the structure and validation rules for contact data">
        <div className="space-y-6 flex flex-row gap-4">
          <div className="flex-2">
            <StyledLabel>
              JSON Schema
              <CodeMirror value={schemaText} onChange={(value) => setSchemaText(value)} lang="json" extensions={[jsonLanguage]} />
            </StyledLabel>
            <p className="mt-2 text-xs text-neutral-500">
              Define the JSON schema for contact data. This will be used to generate forms and validate contact data. See{" "}
              <a href="https://json-schema.org/learn/getting-started-step-by-step" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                JSON Schema documentation
              </a>{" "}
              and{" "}
              <a href="https://rjsf-team.github.io/react-jsonschema-form/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                React JSON Schema Form documentation
              </a>{" "}
              for more information.
            </p>
          </div>
          <div className="flex-1">
            <div className="col-span-2 rjsf-form-wrapper">
              <div className="space-y-4">
                <h2>Preview</h2>
                {schema && (
                  <Form
                    readonly={true}
                    schema={schema}
                    formData={contacts?.[0]?.items[0]?.data ?? {}}
                    liveValidate={false}
                    showErrorList={false}
                    validator={validator}
                    templates={{
                      FieldTemplate,
                    }}
                    uiSchema={{
                      "ui:submitButtonOptions": {
                        norender: true,
                      },
                    }}
                  />
                )}
                {error && <div className="text-red-500">{error.message}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          {project.contactDataSchema && (
            <DangerButton type="button" onClick={removeSchema}>
              Remove
            </DangerButton>
          )}
          <BlackButton type="button" onClick={loadSchemaFromFirstContact}>
            Load from first contact
          </BlackButton>
          <BlackButton type="button" onClick={update}>
            Save
          </BlackButton>
        </div>
      </Card>
    </>
  );
}
