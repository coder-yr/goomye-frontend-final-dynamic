import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side: branding, headline, testimonials, product images */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-8 py-12">
        <img src="/logo.png" alt="Logo" className="mb-8 w-16 h-16" />
        <h1 className="text-3xl font-bold mb-6 text-center">The easiest way to shop everything you need</h1>
        <div className="flex flex-row gap-4 mb-8">
          {/* Example avatars */}
          <img src="/avatar1.jpg" alt="" className="w-12 h-12 rounded-full" />
          <img src="/avatar2.jpg" alt="" className="w-12 h-12 rounded-full" />
          <img src="/avatar3.jpg" alt="" className="w-12 h-12 rounded-full" />
          <img src="/avatar4.jpg" alt="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex flex-row gap-4">
          <img src="/product1.jpg" alt="" className="w-24 h-24 rounded-lg object-cover" />
          <img src="/product2.jpg" alt="" className="w-24 h-24 rounded-lg object-cover" />
        </div>
        <div className="mt-8 bg-white rounded-lg shadow p-4 w-64">
          <div className="mb-2 h-4 bg-gray-200 rounded w-3/4" />
          <div className="mb-2 h-4 bg-gray-200 rounded w-1/2" />
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-green-500 text-xl">★</span>
            ))}
          </div>
        </div>
      </div>
      {/* Right side: reset form */}
      <div className="flex-1 flex items-center justify-center bg-background px-8 py-12">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
