import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GoogleLogo from './assets/GoogleLogo.png';
import { login } from '../../Middlewares/data/authapi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, role, error } = await login(email, password);
      localStorage.setItem('data', data);
      localStorage.setItem('role', role);
      localStorage.setItem('error', error);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.setItem('error', error);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:3001/api/v1/auth/google';
  };

  return (
    <div>
      <main className="flex justify-center flex-col items-center h-full">
        <div className="bg-khaitan-red text-white pb-8 px-6">
          <img src="/khaitan.gif" alt="Khaitan" className="h-12" />
        </div>
        <div className="bg-white shadow-md rounded-lg w-full max-w-md max-w-sm p-8">
          <h1 className="text-left font-sans text-3xl font-bold mb-6">Sign in</h1>
          <form onSubmit={handleLogin}>
            <div className="text-left mb-6">
              <label htmlFor="email" className="block font-medium mb-4">
                Email or mobile phone number
              </label>
              <input
                type="text"
                id="email"
                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                placeholder="Enter your email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="text-left mb-6">
              <label htmlFor="password" className="block font-medium mb-4">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-md py-2 px-3 w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Log In
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center space-x-4 bg-white border font-medium py-2 px-4 rounded-full w-full mt-4"
          >
            <img src={GoogleLogo} alt="Google Logo" className="w-6 h-6" />
            <span>Sign in with Google</span>
          </button>
          <div className="text-left mt-6 text-sm">
            <p>
              By continuing, you agree to Khaitan{' '}
              <a href="/conditions-of-use" className="text-blue-500">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="/privacy-notice" className="text-blue-500">
                Privacy Notice
              </a>
              .
            </p>
            <a href="/help" className="text-left text-blue-500 inline-block mt-2">
              Need help?
            </a>
          </div>
        </div>
        <div className="mt-6 text-center w-full max-w-md max-w-sm">
          <div className="relative flex items-center justify-center py-4">
            <span className="z-10 bg-white px-4 text-sm font-medium">
              New to Khaitan?
            </span>
            <div className="absolute top-1/2 left-0 right-0 border-b border-gray-400"></div>
          </div>
          <button className="bg-yellow-400 font-medium py-2 px-4 rounded-md mt-2 w-full">
            <NavLink to="/signin" className="text-black font-bold py-2 pr-4 rounded-md inline-block">
              Create your account
            </NavLink>
          </button>
        </div>
        <NavLink to="/" className="text-red-600 font-bold underline py-4 pr-4 rounded-md inline-block">
          <div className="flex flex-row items-center text-center w-full max-w-md max-w-sm">
            <ArrowLeft />
            <p className="text-sm font-medium pr-2">Go Back to Home Page</p>
          </div>
        </NavLink>
        <div className="flex flex-row items-center text-center w-full mt-6 max-w-md max-w-sm">
          {/* <p className="text-sm font-medium pr-2">Already have an account?</p> */}
        </div>
        <footer className="mt-16 text-gray-500 text-sm">
          <div className="flex justify-center mb-2">
            <a href="/terms" className="mr-4">
              Terms of Use
            </a>
            <a href="/privacy" className="mr-4">
              Privacy Policy
            </a>
            <a href="/contact">Contact Us</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LoginPage;