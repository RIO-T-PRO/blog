import React, { useState, useRef, useEffect, useMemo } from "react";
import { useAuth } from "@/lib/context/auth-context";
import { useRoleApplication } from "@/lib/context/role-application";

const ApplyWriterForm = () => {
  const { user } = useAuth();
  const {
    applications,
    fetchMyApplications,
    createApplication,
    loading,
    error,
  } = useRoleApplication();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch user's applications when component mounts
  useEffect(() => {
    fetchMyApplications();
  }, []);

  // Find the most recent writer application (any status)
  const existingWriterApp = useMemo(() => {
    return applications.find((app) => app.role?.name === "writer");
  }, [applications]);

  // Auto-resize textarea
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    autoResize();
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await createApplication({
        roleName: "writer",
        message: message.trim() || undefined,
      });
      setSuccess(true);
      setMessage("");
    } catch {
      // error handled by context
    }
  };

  // ---- If application already exists, show status instead of form ----
  if (existingWriterApp) {
    const statusColors = {
      PENDING: "bg-amber-100 text-amber-800 border-amber-200",
      APPROVED: "bg-green-100 text-green-800 border-green-200",
      REJECTED: "bg-red-100 text-red-800 border-red-200",
      CANCELLED: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <div className="w-[70%]">
        <h2 className="text-2xl font-bold mb-4">Writer Application Status</h2>
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[existingWriterApp.status] ||
                "bg-surface-container text-on-surface-variant"
              }`}
            >
              {existingWriterApp.status}
            </span>
            <span className="text-sm text-on-surface-variant">
              Applied on{" "}
              {new Date(existingWriterApp.createdAt).toLocaleDateString()}
            </span>
          </div>
          {existingWriterApp.message && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-on-surface-variant mb-1">
                Your message:
              </h4>
              <p className="text-on-surface bg-surface-container p-3 rounded-lg text-sm whitespace-pre-wrap">
                {existingWriterApp.message}
              </p>
            </div>
          )}
          <p className="mt-4 text-sm text-on-surface-variant">
            {existingWriterApp.status === "PENDING"
              ? "Your application is currently being reviewed by our team. You’ll receive a notification once a decision is made."
              : existingWriterApp.status === "APPROVED"
                ? "Congratulations! You have been approved as a writer. You can now start publishing articles."
                : existingWriterApp.status === "REJECTED"
                  ? "Unfortunately, your application was not approved at this time. You may apply again in the future."
                  : "Your application has been cancelled."}
          </p>
        </div>
      </div>
    );
  }

  // ---- No existing application: show the form ----
  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center w-[70%]">
        <h3 className="text-lg font-semibold text-green-800">
          Application Submitted!
        </h3>
        <p className="text-green-700 mt-2">
          We’ll review your request and notify you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-[70%]">
      <h2 className="text-2xl font-bold mb-4">Apply to become a Writer</h2>
      <p className="text-on-surface-variant mb-6">
        Tell us why you’d like to contribute. This message is optional but helps
        us understand your motivation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message (optional)
          </label>
          <textarea
            ref={textareaRef}
            id="message"
            rows={1}
            className="w-full rounded-lg border border-outline-variant bg-surface p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none overflow-hidden"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="As a Senior Full Stack Engineer, I possess the unique ability to anticipate..."
          />
        </div>

        {error && <p className="text-sm text-error">Error: {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplyWriterForm;
