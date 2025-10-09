"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, ChevronRight } from "lucide-react";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.46c-.24 1.25-1.65 3.66-5.46 3.66-3.29 0-5.97-2.72-5.97-6.06S8.71 5.64 12 5.64c1.87 0 3.12.8 3.83 1.49l2.61-2.52C16.89 3.2 14.65 2.4 12 2.4 6.84 2.4 2.7 6.54 2.7 11.7S6.84 21 12 21c6.96 0 9.3-4.84 9.3-7.34 0-.49-.05-.84-.12-1.2H12z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden>
      <path fill="#000" d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-.03 0-.06 0-.09-.01-.02-.02-.03-.04-.03-.07 0-1.13.93-2.06 2.07-2.06.03 0 .06 0 .09.01.02.02.03.04.03.07zm4.13 4.37c-.13-.16-.36-.18-.52-.05-1.13.93-2.36 1.47-3.7 1.47-1.34 0-2.57-.54-3.7-1.47-.16-.13-.39-.11-.52.05-1.13 1.36-1.8 3.13-1.8 5.09 0 2.13.81 4.13 2.29 5.65 1.13 1.13 2.36 1.67 3.7 1.67 1.34 0 2.57-.54 3.7-1.67 1.48-1.52 2.29-3.52 2.29-5.65 0-1.96-.67-3.73-1.8-5.09z" />
    </svg>
  );
}

function Field({ label, children, htmlFor }: { label: string; children: React.ReactNode; htmlFor: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground/80">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function SignUpForm() {
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    if (!name || !email || !phone || !password || !password2) {
      setMessage("All fields are required");
      return;
    }
    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:8001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful!");
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (err) {
      setMessage("Network error");
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white">
      {/* Left branding section - updated to match new design */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 h-full px-12 py-8 gap-8 border-r border-gray-100">
        <h1 className="text-4xl font-bold text-left mb-8 leading-tight">The easiest way to shop<br />everything you need</h1>
        <div className="flex flex-col gap-8 items-start">
          <img src="/assets/main-product.png" alt="Main Product" className="rounded-xl h-64 w-56 object-cover mb-2" />
          <div className="flex gap-6 items-center mb-2">
            <img src="/assets/avatar1.png" alt="Avatar 1" className="rounded-full h-12 w-12 object-cover" />
            <img src="/assets/avatar2.png" alt="Avatar 2" className="rounded-full h-12 w-12 object-cover" />
            <img src="/assets/avatar3.png" alt="Avatar 3" className="rounded-full h-12 w-12 object-cover" />
            <img src="/assets/avatar4.png" alt="Avatar 4" className="rounded-full h-12 w-12 object-cover" />
            <img src="/assets/avatar5.png" alt="Avatar 5" className="rounded-full h-12 w-12 object-cover" />
          </div>
          <div className="flex gap-6 items-center">
            <div className="bg-white shadow rounded-lg px-6 py-4 flex flex-col items-start">
              <div className="w-40 h-4 bg-gray-100 rounded mb-2" />
              <div className="w-32 h-3 bg-gray-100 rounded mb-2" />
              <span className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" /></svg>
                ))}
              </span>
            </div>
            <img src="/assets/phones-new.png" alt="Phones" className="rounded-lg h-24 w-36 object-cover" />
          </div>
        </div>
      </div>
      {/* Right signup form section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 py-8">
        <header className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Set up your GOOMYE account</h2>
          <p className="mt-1 text-base text-gray-600">Build digital products with GOOMYE.</p>
        </header>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-4">
          <Button variant="outline" className="h-11 justify-center gap-2 rounded-lg border-input bg-white shadow-sm">
            <GoogleIcon />
            <span>Sign up with Google</span>
          </Button>
          <Button variant="outline" className="h-11 justify-center gap-2 rounded-lg border-input bg-white shadow-sm">
            <AppleIcon className="text-foreground" />
            <span>Sign up with Apple</span>
          </Button>
        </div>
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-input" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-input" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Full name" htmlFor="name">
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="h-11 rounded-lg" autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="h-11 rounded-lg" autoComplete="email" />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 12345 12345" className="h-11 rounded-lg" autoComplete="tel" />
          </Field>
          <div className="space-y-4">
            <Field label="Password" htmlFor="password">
              <div className="relative">
                <Input
                  id="password"
                  type={showPw1 ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="********"
                  className="h-11 rounded-lg pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  aria-label={showPw1 ? "Hide password" : "Show password"}
                  onClick={() => setShowPw1((s) => !s)}
                  className="absolute inset-y-0 right-2 grid place-items-center rounded-md px-1.5 text-muted-foreground hover:text-foreground"
                >
                  {showPw1 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
            <Field label="" htmlFor="password2">
              <div className="relative">
                <Input
                  id="password2"
                  type={showPw2 ? "text" : "password"}
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  placeholder="********"
                  className="h-11 rounded-lg pr-10"
                  autoComplete="new-password"
                  aria-label="Confirm password"
                />
                <button
                  type="button"
                  aria-label={showPw2 ? "Hide password" : "Show password"}
                  onClick={() => setShowPw2((s) => !s)}
                  className="absolute inset-y-0 right-2 grid place-items-center rounded-md px-1.5 text-muted-foreground hover:text-foreground"
                >
                  {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(Boolean(v))} />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I accept the{" "}
              <a href="#" className="font-medium text-brand hover:underline">Terms and Conditions</a>
            </label>
          </div>
          <Button type="submit" className="mt-2 h-11 w-full rounded-lg bg-green-600 text-white hover:bg-green-700" disabled={!accepted}>
            Sign up
          </Button>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Have an account?{" "}
            <Link to="/login" className="inline-flex items-center gap-1 font-medium text-green-700 hover:underline">
              Sign in <ChevronRight className="h-4 w-4" />
            </Link>
          </p>
          {message && <div className="mt-2 text-sm text-red-500 text-center">{message}</div>}
        </form>
      </div>
    </div>
  );
}
