export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-[#E1E0CC] text-2xl mb-4">Authentication Error</h1>
        <p className="text-[#DEDBC8] mb-6">
          There was a problem signing you in. Please try again.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}
