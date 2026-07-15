"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "Sign-in failed.");
      router.replace("/admin");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-8">
      <label htmlFor="admin-password" className="field-label">Password</label>
      <input
        id="admin-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        className="field-input mt-3"
        placeholder="Studio password"
        disabled={!configured || loading}
        autoFocus
      />
      {!configured ? (
        <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/8 p-4 text-sm leading-6 text-amber-100">
          Admin access needs its two private environment variables before it can open.
        </p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-red-300" role="alert">{error}</p> : null}
      <button
        type="submit"
        disabled={!configured || loading || !password}
        className="btn-primary mt-6 w-full px-6 py-3.5 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {loading ? "Opening…" : "Open the studio"}
      </button>
    </form>
  );
}
