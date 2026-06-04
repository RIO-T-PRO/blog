import { useEffect, useState } from "react";
import {
  FaPenNib,
  FaGlobe,
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import { applyWriter, getMyWriterApplication } from "@/lib/api/auth";
import type { WriterApplication } from "@/types/auth";

type MessageType = "success" | "error" | null;

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [application, setApplication] = useState<WriterApplication | null>(
    null,
  );

  const [form, setForm] = useState({
    website: "",
    motivation: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyWriterApplication();

        if (res?.data?.application) {
          setApplication(res.data.application);
        }
      } catch (err) {
        console.log("No existing application");
      } finally {
        setFetching(false);
      }
    };

    load();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (message) {
      setMessage("");
      setMessageType(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setMessageType(null);

    try {
      const res = await applyWriter({
        website: form.website,
        reason: form.motivation,
      });

      if (!res?.data?.application) {
        throw new Error("Invalid response from server");
      }

      setApplication(res.data.application);

      setMessage("Application submitted successfully.");
      setMessageType("success");

      setForm({
        website: "",
        motivation: "",
      });
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit application.";

      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const StatusView = () => {
    if (!application) return null;

    const status = application.status;

    const config = {
      pending: {
        icon: <FaClock />,
        color: "text-amber-600",
        bg: "bg-amber-500/10",
        text: "Pending Review",
      },
      approved: {
        icon: <FaCheckCircle />,
        color: "text-green-600",
        bg: "bg-green-500/10",
        text: "Approved",
      },
      rejected: {
        icon: <FaTimesCircle />,
        color: "text-red-600",
        bg: "bg-red-500/10",
        text: "Rejected",
      },
    }[status] || {
      icon: <FaClock />,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      text: "Pending",
    };

    return (
      <div className="mb-6 p-4 rounded-xl border border-border-muted">
        <div className={`flex items-center gap-2 ${config.color}`}>
          {config.icon}
          <span className="font-medium">{config.text}</span>
        </div>
      </div>
    );
  };

  if (fetching) {
    return <div className="p-6 text-text-secondary">Loading dashboard...</div>;
  }

  const hasApplication = !!application;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-3">
          <FaPenNib />
          Writer Application
        </h1>

        <p className="text-text-secondary mt-2">
          Apply or track your writer application status.
        </p>
      </div>

      {/* STATUS */}
      {hasApplication && <StatusView />}

      {/* FORM OR INFO */}
      {!hasApplication ? (
        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border-muted rounded-2xl p-6 space-y-5"
        >
          {/* WEBSITE */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2">
              <FaGlobe className="text-text-secondary" />
              Website
            </label>

            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full rounded-xl border border-border-muted px-4 py-3"
              placeholder="https://yourportfolio.com"
            />
          </div>

          {/* MOTIVATION */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2">
              <FaPenNib className="text-text-secondary" />
              Motivation
            </label>

            <textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-xl border border-border-muted px-4 py-3"
              placeholder="Why do you want to write?"
            />
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`p-3 rounded-xl text-sm ${
                messageType === "success"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-red-500/10 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl disabled:opacity-50"
          >
            <FaPaperPlane />
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      ) : (
        <div className="text-text-secondary text-sm">
          You already submitted an application. You can track its status above.
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
