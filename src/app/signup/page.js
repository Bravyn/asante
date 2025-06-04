'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/NavBar';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheck } from 'react-icons/fi';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send data to your backend
      localStorage.setItem('userEmail', formData.email);
      
      // Show success state
      setSuccess(true);
      
      // Redirect after delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setErrors({ general: 'Registration failed. Please try again.' });
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden text-center p-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FiCheck className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-3 text-xl font-bold text-gray-900">Registration Successful!</h2>
            <p className="mt-2 text-gray-600">You're being redirected to your dashboard...</p>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-900 p-6 text-white">
            <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
            <p className="text-blue-200 text-center mt-1">Start Learning Today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errors.general && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p>{errors.general}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                  className={`pl-10 w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className={`pl-10 w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password (min 8 characters)"
                  required
                  minLength={8}
                  className={`pl-10 w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  required
                  className={`pl-10 w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'bg-blue-700' : 'bg-blue-900 hover:bg-blue-800'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-800">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}