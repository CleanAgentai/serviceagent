import React, { useCallback } from "react";
import { useMergeLink } from "@mergeapi/react-merge-link";
import { Plug } from "lucide-react";

const Integrations: React.FC = () => {
  // TODO: Replace this with a real link_token from your backend when ready
  const linkToken = "mock-link-token";

  const onSuccess = useCallback((public_token: string) => {
    // TODO: Send public_token to your backend to exchange for account_token
    alert(`Integration successful! Public token: ${public_token}`);
  }, []);

  const { open, isReady } = useMergeLink({
    linkToken,
    onSuccess,
    // onExit: () => {}, // Optional: handle modal close
    // tenantConfig: { apiBaseURL: "https://api.merge.dev" }, // Optional
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: 40,
        minWidth: 380,
        maxWidth: 420,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Plug size={48} color="#2563eb" style={{ marginBottom: 16 }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Integrations</h1>
        <p style={{ color: "#555", fontSize: 16, marginBottom: 24, textAlign: "center" }}>
          Connect your favorite ATS tools to ServiceAgent to automate your workflow.
        </p>
        <button
          disabled={!isReady}
          onClick={open}
          style={{
            padding: "14px 36px",
            fontSize: 18,
            borderRadius: 8,
            background: isReady ? "#2563eb" : "#a5b4fc",
            color: "white",
            border: "none",
            fontWeight: 600,
            cursor: isReady ? "pointer" : "not-allowed",
            marginBottom: 24,
            boxShadow: isReady ? "0 2px 8px rgba(37,99,235,0.08)" : undefined
          }}
        >
          Connect an Integration
        </button>
        <div style={{
          width: "100%",
          padding: "18px 0 0 0",
          borderTop: "1px solid #f1f5f9",
          textAlign: "center",
          color: "#888",
          fontSize: 15
        }}>
          <span>No integrations connected yet.</span>
        </div>
      </div>
    </div>
  );
};

export default Integrations; 