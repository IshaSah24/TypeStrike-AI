import { useNavigate } from '@tanstack/react-router';
import AuthHeader from './AuthHeader';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

export default function AuthForm({ mode }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <AuthHeader isLogin={isLogin} />

        <form className="space-y-4 mt-6">
          {!isLogin && (
            <AuthInput label="Full Name" type="text" placeholder="John Doe" />
          )}
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
          />
          <AuthInput label="Password" type="password" placeholder="********" />

          <AuthButton text={isLogin ? 'Sign In' : 'Sign Up'} />
        </form>

        {/* Toggle Button */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => navigate({ to: isLogin ? "/register" : "/login" })}
            className="ml-1 text-indigo-600 hover:underline font-medium"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
