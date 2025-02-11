import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { signUp } from '../../Middlewares/data/authapi';

const SignInPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = () => {
    const isLongEnough = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]+/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const passwordsMatch = password === passwordConfirm;

    const errors = [];
    if (!isLongEnough) errors.push("- At least 8 characters long");
    if (!hasSpecialChar) errors.push("- Contains at least one special character");
    if (!hasUppercase) errors.push("- Contains at least one uppercase letter");
    if (!passwordsMatch) errors.push("- Passwords must match");

    if (errors.length > 0) {
      setDialogMessage(errors.join('\n'));
      setIsDialogOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        const { token, role } = await signUp(name, email, password);
        localStorage.setItem('jwt', token);
        localStorage.setItem('role', role);
        navigate('/dashboard');
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    }
  };

  return (
    <div>
      <main className="flex flex-col justify-center text-left items-center md:h-[calc(100vh-1rem)] sm:h-[calc(100vh-6rem)]">
        <div className="text-white py-8 px-6">
          <img src="/khaitan.gif" alt="Khaitan" className="h-12" />
        </div>
        <div className="bg-white shadow-md rounded-lg w-full max-w-md max-w-sm p-8">
          <h1 className="font-sans text-3xl font-bold mb-6">Create account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                placeholder="Must be at least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="passwordConfirm" className="block font-medium mb-2">
                Password again
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                placeholder="Re-enter your password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 font-medium py-2 px-4 rounded-md mt-2 w-full"
            >
              Create your account
            </button>
          </form>
          <div className="my-4 text-sm">
            <p>
              By creating an account or logging in, you agree to Khaitan{' '}
              <a href="/conditions-of-use" className="text-blue-500">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-blue-500">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="flex flex-row items-center text-center w-full max-w-md max-w-sm">
            <p className="text-sm font-medium pr-2">Already have an account?</p>
            <NavLink to="/login" className="text-red-600 font-bold underline py-2 pr-4 rounded-md inline-block">
              Log in
            </NavLink>
          </div>
          <NavLink to="/" className="text-red-600 font-bold underline py-4 pr-4 rounded-md inline-block">
            <div className="flex flex-row items-center text-center w-full max-w-md max-w-sm">
              <ArrowLeft />
              <p className="text-sm font-medium pr-2">Go Back to Home Page</p>
            </div>
          </NavLink>
        </div>
      </main>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Invalid Password</h2>
            <p className="mb-4 text-gray-700">
              Please ensure your password meets the following criteria:
            </p>
            <pre className="bg-gray-100 p-4 rounded mb-4 text-left text-sm">
              {dialogMessage}
            </pre>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;