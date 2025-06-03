'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/NavBar';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  function handleLogin(e) {
    e.preventDefault();
    localStorage.setItem('userEmail', email);
    router.push('/dashboard');
  }

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>
      </main>
    </>
  );
}
