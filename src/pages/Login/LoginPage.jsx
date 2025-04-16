import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GoogleLogo from '../../assets/googleLogo.png';
import { useAuth } from '../../AuthContext';
// Import the CSS file
import './styles/loginpage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const [forgotPassword, setforgotPassword] = useState(false);

  const handleGoogleSignIn = () => {
    alert("Functionality under development. Please use email and password to login. Sorry for the inconvenience");
  };

  const handleForgotPassword = () => {
    setforgotPassword(true);
  };

  const handlePasswordReset = () => {
    alert('Password reset link sent to your email.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth && auth.login) {
      const response = await auth.login(email, password);
      if (response.sucess == true && response.data.user.isRoleVerified) {
        navigate('/dashboard/analytics');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } else {
      alert('Login function is not available.');
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center">
      <div className="flex flex-col md:flex-row w-[60%] justify-center min-h-screen">
        {/* Welcome Animation Side (Left) */}
        <div className="bg-khaitan-white text-red md:w-1/2 flex bg-red-100 rounded-md flex-col justify-center items-center p-8" >
          
          <div className="welcome-animation w-full">
            <h1 className="text-4xl font-bold mb-4 animate-slide-in" style={{color: 'red'}}>
              Welcome to
            </h1>
            <h2 className="text-3xl font-semibold mb-8 animate-fade-in" style={{color: 'red'}}>
              Khaitan India Ltd. Admin Panel
            </h2>
            <p className="text-xl animate-bounce-in" style={{color: 'red'}}>
              Manage your business operations with ease
            </p>
          </div>
        </div>

        {/* Login Side (Right) */}
        <div className="md:w-1/2 bg-red-50 flex flex-col justify-center items-center p-6">
          <img src="/khaitan.gif" alt="Khaitan" className="h-16 mb-8" />
          <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
            <h1 className="text-left font-sans text-3xl font-bold mb-6">Sign in</h1>
            <form onSubmit={handleSubmit}>
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
                <a href="" className="text-blue-500">
                  Conditions of Use
                </a>{' '}
                and{' '}
                <a href="" className="text-blue-500">
                  Privacy Notice
                </a>
                .
              </p>
              <a href="" className="text-left text-blue-500 inline-block mt-2">
                Need help?
              </a>
            </div>
          </div>
          <div className="mt-6 text-center w-full max-w-md">
            <div className="relative flex items-center justify-center py-4">
              <span className="z-10 bg-gray-50 px-4 text-sm font-medium">
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
            <div className="flex flex-row items-center text-center">
              <ArrowLeft />
              <p className="text-sm font-medium pr-2">Go Back to Home Page</p>
            </div>
          </NavLink>
          <footer className="mt-8 text-gray-500 text-sm">
            <div className="flex justify-center mb-2">
              <a href="" className="mr-4">
                Terms of Use
              </a>
              <a href="" className="mr-4">
                Privacy Policy
              </a>
              <a href="">Contact Us</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;