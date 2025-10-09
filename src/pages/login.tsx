import { LoginForm } from "@/components/auth/LoginForm";
import { DecorativeSection } from "@/components/auth/DecorativeSection";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Decorative */}
        <div className="hidden lg:flex bg-background border-r border-border">
          <DecorativeSection />
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;