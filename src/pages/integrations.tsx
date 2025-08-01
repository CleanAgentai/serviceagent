import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";

interface CurrentUser {
  id: string;
  email: string;
  companyName: string;
  companyProfileId: string;
}

interface ATSIntegration {
  id: string;
  name: string;
  category: string;
  logo: string;
  isConnected: boolean;
}

// ATS integrations data based on available logos
const atsIntegrations: ATSIntegration[] = [
  { id: 'greenhouse', name: 'Greenhouse', category: 'ATS API', logo: '/Greenhouse_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'lever', name: 'Lever', category: 'ATS API', logo: '/Lever_Square_Logo_oYg8yBW-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'bamboohr', name: 'BambooHR', category: 'ATS API', logo: '/BambooHR_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'workable', name: 'Workable', category: 'ATS API', logo: '/Workable_Square_Logo_OvllNl9-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'ashby', name: 'Ashby', category: 'ATS API', logo: '/Ashby_Square_Logo_3uQWavw-thumbnail-144x144.png', isConnected: false },
  { id: 'jobvite', name: 'Jobvite', category: 'ATS API', logo: '/Jobvite_Square_Logo-thumbnail-144x144.png', isConnected: false },
  { id: 'oracle', name: 'Oracle Recruiting', category: 'ATS API', logo: '/Oracle_Recruiting_square-thumbnail-144x144.png', isConnected: false },
  { id: 'smartrecruiters', name: 'SmartRecruiters', category: 'ATS API', logo: '/SmartRecruiters_Square_Logo_j8vLfEW-thumbnail-144x144.png', isConnected: false },
  { id: 'successfactors', name: 'SuccessFactors', category: 'ATS API', logo: '/SuccessFactors_Square_Logo_BcXogF0-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'taleo', name: 'Oracle Taleo', category: 'ATS API', logo: '/Taleo_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'teamtailor', name: 'Teamtailor', category: 'ATS API', logo: '/Teamtailor_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'ukg', name: 'UKG Pro Recruiting', category: 'ATS API', logo: '/UKG_Square_Logo_zTMYILE-thumbnail-144x144.png', isConnected: false },
  { id: 'cornerstone', name: 'Cornerstone', category: 'ATS API', logo: '/Cornerstone_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'cats', name: 'CATS', category: 'ATS API', logo: '/CATS_Square_Logo_J4NkqoE-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'fountain', name: 'Fountain', category: 'ATS API', logo: '/Fountain_Square_Logo-thumbnail-144x144.png', isConnected: false },
  { id: 'hrcloud', name: 'HR Cloud', category: 'ATS API', logo: '/HR_Cloud_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'pinpoint', name: 'Pinpoint', category: 'ATS API', logo: '/Pinpoint_square-thumbnail-144x144.png', isConnected: false },
  { id: 'breezy', name: 'Breezy HR', category: 'ATS API', logo: '/Breezy_Square_Logo-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'applicantstack', name: 'ApplicantStack', category: 'ATS API', logo: '/ApplicantStack_Square_Logo_wBHYVRL-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'recruiterflow', name: 'RecruiterFlow', category: 'ATS API', logo: '/RecruiterFlow_Square_Logo_0pzjFF2-thumbnail-144x144-70.jpg', isConnected: false },
  { id: 'zoho', name: 'Zoho Recruit', category: 'ATS API', logo: '/PlatformZoho_recruit_square-thumbnail-144x144.png', isConnected: false },
  { id: 'bullhorn', name: 'Bullhorn', category: 'ATS API', logo: '/Property_1Integration_Property_2Generic_Property_3Square_Property_4Bullhorn-thumbnail-144x144.png', isConnected: false },
  { id: 'icims', name: 'iCIMS', category: 'ATS API', logo: '/PlatformICIMS_square-thumbnail-144x144.png', isConnected: false },
  { id: 'jobdiva', name: 'JobDiva', category: 'ATS API', logo: '/PlatformJobDiva-thumbnail-144x144.png', isConnected: false },
];

// (unchanged) your helper to grab the logged‑in user/profile
async function fetchCurrentUser(): Promise<CurrentUser> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) throw userError || new Error("No user");
  const { data: profile, error: profileError } = await supabase
    .from("company_profiles")
    .select("*")
    .eq("created_by_user_id", user.id)
    .single();
  if (profileError || !profile) throw profileError || new Error("No profile");
  return {
    id: user.id,
    email: user.email || "",
    companyName: profile.company_name,
    companyProfileId: profile.id,
  };
}

const Integrations: React.FC = () => {
  const knitRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState<Set<string>>(new Set());
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // 1) Fetch & inject a fresh Knit session token
  const fetchSessionToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔄 Starting fetchSessionToken...");
      const user = await fetchCurrentUser();
      console.log("👤 User fetched successfully");
      
      // Validate API configuration
      if (!apiBaseUrl) {
        console.error("❌ API base URL not configured");
        setError("API base URL not configured");
        return;
      }

      
      const apiUrl = `${apiBaseUrl}/api/knit/auth/session`;
      console.log("🌐 Initiating auth session...");
      
      // Updated to match backend controller field names
      const requestPayload = {
        originOrgId: user.id, // Using user.id as org identifier
        originOrgName: user.companyName,
        originUserEmail: user.email,
        originUserName: user.email.split('@')[0] // Extract username from email
      };
      console.log("📦 Sending auth request...");
      
      const resp = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });
      
      if (!resp.ok) {
        const responseText = await resp.text();
        console.error("❌ Auth request failed. Status:", resp.status);
        throw new Error(`Authentication failed: ${resp.status}`);
      }
      
      const responseText = await resp.text();
      console.log("📄 Response received");
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log("✅ Response parsed successfully");
      } catch (jsonError) {
        console.error("❌ Invalid response format");
        throw new Error("Invalid response from server");
      }
      
      // Backend returns { success: true, token: "..." }
      const { success, token } = responseData;
      console.log("🔑 Auth session:", success ? "✅ Success" : "❌ Failed");
      
      if (success && token) {
        knitRef.current?.setAttribute("authsessiontoken", token);
        console.log("✅ Token set on knit-auth element");
      } else {
        throw new Error("Authentication session failed");
      }
    } catch (err: any) {
      console.error("🚨 Auth session failed:", err.message);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // 2) Event handlers for the Knit UI
  const handleNewSession = useCallback(
    (e: CustomEvent) => {
      e.preventDefault();
      fetchSessionToken();
    },
    [fetchSessionToken]
  );

  const handleFinish = useCallback((e: CustomEvent) => {
    const details = e.detail.integrationDetails;
    console.log("Knit integration completed:", details);
    // TODO: optionally POST `details` back to your server to persist
  }, []);

  const handleDeactivate = useCallback((e: CustomEvent) => {
    console.log("Knit integration deactivated:", e.detail.integrationDetails);
  }, []);

  const handleClose = useCallback((e: CustomEvent) => {
    console.log("Knit UI closed");
  }, []);

  // 3) Wire up listeners & kick off first session
  useEffect(() => {
    const el = knitRef.current;
    if (!el) {
      console.warn("⚠️ Knit component not ready, retrying...");
      return;
    }
    el.addEventListener("onNewSession", handleNewSession as EventListener);
    el.addEventListener("onFinish", handleFinish as EventListener);
    el.addEventListener(
      "onDeactivate",
      handleDeactivate as EventListener
    );
    el.addEventListener("onKnitClose", handleClose as EventListener);

    // Initialize auth session
    fetchSessionToken().catch(err => {
      console.error("🚨 Auth session initialization failed:", err.message);
    });

    return () => {
      el.removeEventListener(
        "onNewSession",
        handleNewSession as EventListener
      );
      el.removeEventListener("onFinish", handleFinish as EventListener);
      el.removeEventListener(
        "onDeactivate",
        handleDeactivate as EventListener
      );
      el.removeEventListener("onKnitClose", handleClose as EventListener);
    };
  }, [
    fetchSessionToken,
    handleNewSession,
    handleFinish,
    handleDeactivate,
    handleClose,
  ]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Main Content Container */}
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        
        {/* Header Icon */}
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#3b82f6', 
          borderRadius: '20px',
          margin: '0 auto 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>

        {/* Title and Description */}
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '700', 
          color: '#1e293b',
          margin: '0 0 16px 0',
          lineHeight: '1.1'
        }}>
          Integrations
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#64748b',
          margin: '0 0 48px 0',
          lineHeight: '1.5',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Connect your ATS to ServiceAgent to automate your hiring workflow.
        </p>

        {/* Main Connection Button */}
        <div style={{ marginBottom: '64px' }}>
          {error && (
            <div style={{ 
              color: '#dc2626', 
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '32px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <knit-auth ref={knitRef} skipIntro="">
            <button
              slot="trigger"
              disabled={loading}
              style={{
                padding: "16px 32px",
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '12px',
                background: loading ? "#94a3b8" : "#3b82f6",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#3b82f6';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? "Loading..." : "Connect an Integration"}
            </button>
          </knit-auth>
        </div>

        {/* Available Integrations Showcase */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#1e293b',
            margin: '0 0 32px 0'
          }}>
            Available Integrations
          </h2>
          
          {/* Logos Grid - Visual Only */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '24px',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            {atsIntegrations.slice(0, 12).map((integration) => (
              <div
                key={integration.id}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <img
                  src={integration.logo}
                  alt={integration.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
                <span style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#64748b',
                  textAlign: 'center'
                }}>
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
          
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            fontStyle: 'italic'
          }}>
            + {atsIntegrations.length - 12} more integrations available
          </p>
        </div>

        {/* Connection Status */}
        {connectedIntegrations.size === 0 ? (
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            margin: 0
          }}>
            No integrations connected yet.
          </p>
        ) : (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#166534',
              margin: '0 0 16px 0'
            }}>
              Connected Integrations ({connectedIntegrations.size})
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Array.from(connectedIntegrations).map(id => {
                const integration = atsIntegrations.find(i => i.id === id);
                return integration ? (
                  <div key={id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'white',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px'
                  }}>
                    <img src={integration.logo} alt={integration.name} style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
                    <span style={{ fontSize: '14px', color: '#166534' }}>{integration.name}</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Integrations;
