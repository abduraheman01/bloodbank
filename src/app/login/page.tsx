import { Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { login } from '@/app/actions/auth';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 shadow-red-100/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your BBDMS account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-start gap-3">
             <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
             <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-6" action={login}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                name="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password"
                name="password"
                required 
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                placeholder="••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-red-500 focus:ring-red-500" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <Link href="#" className="font-medium text-red-600 hover:text-red-700">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center justify-center gap-2">
            Sign In <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-red-600 hover:text-red-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
