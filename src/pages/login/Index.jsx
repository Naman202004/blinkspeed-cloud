import { useState } from 'react'

import { ArrowRight } from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext.jsx'

import { OAuthSocialSection } from '../../components/auth/OAuthSocialSection.jsx'

import W3OptimizeLogo from '../../assets/Logo/W3OptimizeLogo.webp'



const Index = () => {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)



  async function handleSubmit(e) {

    e.preventDefault()

    setError(null)

    setLoading(true)

    try {

      await login(email, password)

      navigate('/dashboard', { replace: true })

    } catch (err) {

      setError(err instanceof Error ? err.message : 'Sign in failed')

    } finally {

      setLoading(false)

    }

  }



  return (

    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">

      <div className="w-full max-w-sm space-y-8">

        <div className="flex justify-center">

          <div className="p-[8px_0_16px_8px]">

            <img src={W3OptimizeLogo} alt="Logo" className="max-w-[170px]" />

          </div>

        </div>



        <div className="text-center space-y-2">

          <h2 className="text-3xl font-bold text-gray-900">Sign in to Blink Speed</h2>

          <p className="text-base text-gray-700">

            Use your email and password, or continue with Google, GitHub, LinkedIn, or Facebook

            when your admin has turned them on and the API is configured.

          </p>

          <p className="text-sm text-gray-600 mt-2">

            Don&apos;t have an account?{' '}

            <Link

              to="/register"

              className="text-purple-600 hover:text-purple-700 underline font-medium"

            >

              Sign up

            </Link>

          </p>

        </div>



        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label htmlFor="email" className="block text-sm font-medium text-gray-700">

              Email

            </label>

            <input

              id="email"

              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              placeholder="you@example.com"

              autoComplete="username"

              required

              className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"

            />

          </div>

          <div>

            <label htmlFor="password" className="block text-sm font-medium text-gray-700">

              Password

            </label>

            <input

              id="password"

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              placeholder="Password"

              autoComplete="current-password"

              required

              className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"

            />

          </div>



          {error ? (

            <p className="text-sm text-red-600" role="alert">

              {error}

            </p>

          ) : null}



          <button

            type="submit"

            disabled={loading}

            className="w-full bg-purple-600 text-white font-medium py-2.5 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-sm disabled:opacity-60"

          >

            <span>{loading ? 'Signing in…' : 'Sign in'}</span>

            {!loading ? <ArrowRight size={18} className="text-white" /> : null}

          </button>

        </form>



        <OAuthSocialSection />



        <div className="space-y-4 text-center">

          <p className="text-sm text-gray-600">

            By proceeding, you agree to the{' '}

            <a href="#" className="text-blue-600 underline hover:text-blue-700">

              Terms of Use

            </a>{' '}

            and the{' '}

            <a href="#" className="text-blue-600 underline hover:text-blue-700">

              Privacy Policy

            </a>

            .

          </p>

          <a href="#" className="text-sm text-blue-600 underline hover:text-blue-700 block">

            Contact us

          </a>

        </div>

      </div>

    </div>

  )

}



export default Index

