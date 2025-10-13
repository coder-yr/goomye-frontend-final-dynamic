"use client"

import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const ResetPasswordForm = () => {
  return (
    <div className="mx-auto w-full max-w-xl">
      <header className="mb-6">
        <h2 className="text-balance text-2xl font-semibold">Reset your password</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter the email address associated with your account. We&apos;ll send you a link to reset your password.
        </p>
      </header>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            Email
          </label>
          <Input id="email" type="email" placeholder="you@email.com" className="h-11 rounded-lg" autoComplete="email" />
        </div>

        <Button type="submit" className="mt-2 h-11 w-full rounded-lg bg-brand text-brand-foreground hover:bg-brand/90">
          Send email
        </Button>

        <p className="mt-2 text-sm text-muted-foreground">
          You didn&apos;t forget your password?{" "}
          <Link to="/login" className="inline-flex items-center gap-1 font-medium text-brand hover:underline">
            Sign in <ChevronRight className="h-4 w-4" />
          </Link>
        </p>
      </form>
    </div>
  )
}

export default ResetPasswordForm;
