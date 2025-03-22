import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { getAllRoles } from '../../services/roleService';


const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [otpPage, setotpPage] = useState(false);
  const [userId, setuserId] = useState(0);
  const [otp, setOtp] = useState('');
  const { register, userVerification } = useAuth();
  const [allRoles, setallRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const getRoles = async () => {
    try{
      const roles = await getAllRoles();
      setallRoles(roles.data);
    }
    catch(err){
      console.log("Error in fetching Roles: ",err);
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  const validatePassword = () => {
    // Check password criteria
    const isLongEnough = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);

    // Check if passwords match
    const passwordsMatch = password === passwordConfirm;

    // Prepare error messages
    const errors = [];
    if (!isLongEnough) errors.push("- At least 8 characters long");
    if (!hasUppercase) errors.push("- Contains at least one uppercase letter");
    if (!passwordsMatch) errors.push("- Passwords must match");

    if (errors.length > 0) {
      setDialogMessage(errors.join('\n'));
      setIsDialogOpen(true);
      return false;
    }

    return true;
  };

  const handleCreation = async (e) => {
    e.preventDefault();
    // Proceed with form submission
    try {
      const response = await userVerification(userId, Number(otp));
      if (response.success) {
        setIsAccountCreated(true);
        setTimeout(() => {
            navigate('/login');
          }, 4000);
        } else {
          alert('Account creation failed. Please try again.');
        }
    } catch (error) {
      console.error("Error during OTP verification: ", error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        const response = await register(email, passwordConfirm, name, phoneNumber, selectedRole);
        console.log("Registration Response: ", response);
        if (response.sucess) {
          setuserId(response.data.id);
          setotpPage(true);
        }
      } catch (error) {
        console.error("Error during registration: ", error);
      }
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
    // console.log("Updated OTP: ", newOtp.join(''));
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };
  
  return (
    <div>
      <main className="flex flex-col justify-center text-left items-center md:h-[110vh] sm:h-[calc(100vh-6rem)]">
        <div className="text-white py-8 px-6">
          <img src="/khaitan.gif" alt="Khaitan" className="h-12" />
        </div>
        {isAccountCreated ? (
          <div className="bg-white shadow-md rounded-lg w-full max-w-md max-w-sm p-8 text-center">
            <h1 className="font-sans text-3xl font-bold mb-6">Account Created Successfully! You are unverified. Please wait till admin verifies your requested role.</h1>
            <img src="/success-animation.gif" alt="Success" className="h-36 mx-auto" />
          </div>
        ) : otpPage ? (
          <div className='h-96'>
            <div className="h-full bg-white shadow-md rounded-lg w-full max-w-md max-w-sm p-8">
              <h1 className="font-sans text-3xl font-bold">Enter OTP</h1>
              <div className='flex justify-center h-[70%] pt-16'>
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ''}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="border border-gray-300 h-16 rounded-md py-2 px-3 text-center mx-1 w-12"
                  />
                ))}
              </div>
              <button
                onClick={handleCreation}
                type="submit"
                className="bg-red-300 font-medium py-2 px-4 rounded-md mt-2 w-full"
                >Submit OTP</button>
            </div>
          </div>
        ) : (
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                  placeholder="First and last name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="phone"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                  placeholder="Contact"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block font-medium mb-2">
                  Select Role
                </label>
                {allRoles.length > 0 ? (
                  <select
                    id="role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    required
                  >
                    <option value="" disabled>Choose a role</option>
                    {allRoles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="border border-gray-300 rounded-md py-2 px-3 w-full bg-gray-100 text-gray-600">
                    No roles available. Please refresh the browser and try again.
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                  placeholder="Must be at least 8 characters"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="passwordConfirm" className="block font-medium mb-2">
                  Password again
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder-gray-300"
                  placeholder="Re-enter your password"
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
              <p className="text-center">
                &copy; 2024 Khaitan. All rights reserved.
              </p>
            </footer>
          </div>
        )}
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

export default CreateAccountPage;