import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin')
      } else {
        setError(data.error || 'Error al iniciar sesión')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - Cástor & Póllux</title>
        <html className="dark" />
        <style>{`
          body {
            background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          }
        `}</style>
      </Head>
      
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-dark/80 dark:bg-background-dark/80 p-4 font-display">
        <div className="layout-container flex w-full max-w-md flex-col items-center justify-center">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <span className="material-symbols-outlined text-white text-5xl mb-2">
              rocket_launch
            </span>
            <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">
              Cástor & Póllux - Admin Panel
            </h1>
          </div>

          {/* Login Card */}
          <div className="w-full rounded-xl bg-[#1d1c27]/80 dark:bg-[#1d1c27]/80 backdrop-blur-sm border border-[#3f3b54] p-8 shadow-2xl">
            <div className="flex flex-col w-full">
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center pb-8">
                Administrator Login
              </h2>
              
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                {/* Password Input */}
                <label className="flex flex-col w-full">
                  <p className="text-white/90 text-base font-medium leading-normal pb-2">Password</p>
                  <div className="relative flex w-full items-center">
                    <span className="material-symbols-outlined text-[#a19db9] absolute left-4">lock</span>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary-admin/50 border border-[#3f3b54] bg-admin-dark focus:border-primary-admin h-14 placeholder:text-[#a19db9] pl-12 pr-4 py-3 text-base font-normal leading-normal"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </label>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary-admin text-white hover:bg-primary-admin/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1d1c27] focus:ring-primary-admin transition-all duration-200 text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <span className="truncate">Log In</span>
                    )}
                  </button>
                </div>
              </form>

              {/* Back Link */}
              <div className="mt-6 text-center">
                <a href="/" className="text-sm text-[#a19db9] hover:text-white hover:underline focus:outline-none focus:underline">
                  ← Back to main site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
