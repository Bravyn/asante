'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4">
      <ul className="flex gap-4">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/login" className="hover:underline">Login</Link></li>
        <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link href="/courses" className="hover:underline">Courses</Link></li>
        <Link href="/profile" className="ml-4 hover:underline">
          Profile
        </Link>
      </ul>
    </nav>
  );
}
