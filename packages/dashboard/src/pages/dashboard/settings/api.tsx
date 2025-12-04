import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DangerButton } from "../../../components/Buttons/DangerButton";
import Card from "../../../components/Card/Card";
import { StyledLabel } from "../../../components/Label/StyledLabel";
import SettingTabs from "../../../components/Navigation/SettingTabs/SettingTabs";
import Modal from "../../../components/Overlay/Modal/Modal";
import { API_URI } from "../../../lib/constants";
import { useCurrentProject, useCurrentProjectKeys } from "../../../lib/hooks/projects";
import { network } from "../../../lib/network";

const ClipboardButton = ({ text, label, description }: { text: string; label: string; description: string }) => {
  return (
    <div className="mt-4">
      <StyledLabel>
        <button
          onClick={() => {
            void navigator.clipboard.writeText(text);
            toast.success(`Copied your ${label}`);
          }}
          className="w-full"
        >
          {label}
          <p className="cursor-pointer rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm truncate" id="api-endpoint">
            {text}
          </p>

          <p className="text-sm text-neutral-500">{description}</p>
        </button>
      </StyledLabel>
    </div>
  );
};

/**
 *
 */
export default function ApiSettingsPage() {
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  const { data: activeProjectKeys, mutate: activeProjectKeysMutate } = useCurrentProjectKeys();
  const project = useCurrentProject();

  function expiresAt(key: string | undefined) {
    if (!key) {
      return "";
    }
    const expiresAt = JSON.parse(atob(key.split(".")[1])).exp;
    return new Date(expiresAt * 1000).toLocaleString();
  }

  const regenerate = () => {
    setShowRegenerateModal(!showRegenerateModal);

    toast.promise(
      network
        .fetch<
          {
            public: string;
            secret: string;
          },
          never
        >(`/projects/${project.id}/keys`, { method: "POST" })
        .then(() => activeProjectKeysMutate()),
      {
        loading: "Regenerating API keys...",
        success: "Successfully regenerated API keys!",
        error: "Failed to create new API keys",
      },
    );
  };

  return (
    <>
      <Modal
        isOpen={showRegenerateModal}
        onToggle={() => setShowRegenerateModal(!showRegenerateModal)}
        onAction={regenerate}
        type="danger"
        title="Are you sure?"
        description="Any applications that use your previously generated keys will stop working!"
      />

      <SettingTabs />
      <Card
        title="API Access"
        description={`Manage your API access for ${project.name}.`}
        actions={
          <DangerButton onClick={() => setShowRegenerateModal(!showRegenerateModal)}>
            <RefreshCw strokeWidth={1.5} size={18} />
            Regenerate
          </DangerButton>
        }
      >
        <ClipboardButton text={API_URI ?? ""} label="API Endpoint" description="The endpoint to your Sendra API." />
        <ClipboardButton text={project.id} label="Project ID" description="The ID of your project, used to identify your project in the API." />
        <ClipboardButton
          text={activeProjectKeys?.public ?? ""}
          label="Public API Key"
          description={`Use this key for any front-end services. This key can only be used to publish events. This key expires at ${expiresAt(activeProjectKeys?.public)}.`}
        />
        <ClipboardButton
          text={activeProjectKeys?.secret ?? ""}
          label="Secret API Key"
          description={`Use this key for any secure back-end services. This key gives complete access to your Sendra setup. This key expires at ${expiresAt(activeProjectKeys?.secret)}.`}
        />
      </Card>
    </>
  );
}
