import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GoogleLogo from '../../assets/googleLogo.png';
import { useAuth } from '../../AuthContext';
import { getAllRoles } from '../../services/roleService';

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
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
    try {
      const roles = await getAllRoles();
      setallRoles(roles.data);
    }
    catch (err) {
      console.log("Error in fetching Roles: ", err);
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
        const response = await register(email, passwordConfirm, name, phoneNumber, selectedRole, gender, dateOfBirth);
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
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleGoogleSignIn = () => {
    alert("Functionality under development. Please use email and password to sign up. Sorry for the inconvenience");
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center">
      <div className="flex flex-col md:flex-row w-[60%] justify-center min-h-screen">
        {/* Welcome Animation Side (Left) */}
        <div className="bg-khaitan-white text-red md:w-1/2 flex bg-red-100 rounded-md flex-col justify-center items-center p-8">
          <div className="welcome-animation w-full">
            <h1 className="text-4xl font-bold mb-4 animate-slide-in" style={{ color: 'red' }}>
              Join us at
            </h1>
            <h2 className="text-3xl font-semibold mb-8 animate-fade-in" style={{ color: 'red' }}>
              Khaitan India Ltd. Admin Panel
            </h2>
            <p className="text-xl animate-bounce-in" style={{ color: 'red' }}>
              Create your account to get started
            </p>
          </div>
        </div>

        {/* Sign Up Side (Right) */}
        <div className="md:w-1/2 bg-red-50 flex flex-col justify-center items-center p-6">
          <img src="/khaitan.gif" alt="Khaitan" className="h-16 mb-8" />

          {isAccountCreated ? (
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 text-center">
              <h1 className="font-sans text-3xl font-bold mb-6">Account Created Successfully!</h1>
              <p className="mb-4">You are unverified. Please wait till admin verifies your requested role.</p>
              <img src="/success-animation.gif" alt="Success" className="h-36 mx-auto" />
            </div>
          ) : otpPage ? (
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
              <h1 className="font-sans text-3xl font-bold mb-6">Enter OTP</h1>
              <div className="flex justify-center pt-6 pb-8">
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
                className="bg-red-600 text-white font-medium py-2 px-4 rounded-md w-full"
              >Submit OTP</button>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
              <h1 className="text-left font-sans text-3xl font-bold mb-6">Create account</h1>
              <form onSubmit={handleSubmit}>
                <div className="text-left mb-4">
                  <label htmlFor="name" className="block font-medium mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    placeholder="First and last name"
                    required
                  />
                </div>
                <div className="text-left mb-4">
                  <label htmlFor="gender" className="block font-medium mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    required
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="text-left mb-4">
                  <label htmlFor="dateOfBirth" className="block font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    required
                  />
                </div>
                <div className="text-left mb-4">
                  <label htmlFor="phoneNumber" className="block font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="text-left mb-4">
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
                <div className="text-left mb-4">
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="text-left mb-4">
                  <label htmlFor="password" className="block font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    placeholder="Must be at least 8 characters"
                    required
                  />
                </div>
                <div className="text-left mb-6">
                  <label htmlFor="passwordConfirm" className="block font-medium mb-2">
                    Password again
                  </label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-3 w-full"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-red-600 text-white font-medium py-2 px-4 rounded-md w-full"
                >
                  Create your account
                </button>
              </form>
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center space-x-4 bg-white border font-medium py-2 px-4 rounded-full w-full mt-4"
              >
                <img src={GoogleLogo} alt="Google Logo" className="w-6 h-6" />
                <span>Sign up with Google</span>
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
                <div className="flex items-center mt-4">
                  <span>Already have an account?</span>
                  <NavLink to="/login" className="text-blue-500 ml-2">
                    Log in
                  </NavLink>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 w-full max-w-md">
            <NavLink to="/" className="text-red-600 font-bold underline py-2 pr-4 rounded-md inline-flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              <span>Go Back to Home Page</span>
            </NavLink>
          </div>

          <footer className="mt-8 text-gray-500 text-sm w-full max-w-md">
            <div className="flex justify-center mb-2">
              <a href="" className="mr-4">
                Terms of Use
              </a>
              <a href="" className="mr-4">
                Privacy Policy
              </a>
              <a href="">Contact Us</a>
            </div>
            <p className="text-center">
              &copy; 2024 Khaitan. All rights reserved.
            </p>
          </footer>
        </div>
      </div>

      {/* Dialog for password validation errors */}
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
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
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