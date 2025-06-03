'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar';


export default function Profile() {
    // Initialize state, load from localStorage if available
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        avatar: '', // url or base64
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Load saved profile from localStorage on mount
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            setProfile(JSON.parse(saved));
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    }

    function handleAvatarChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setMessage('Profile saved successfully!');
        //setTimeout(() => setMessage(''), 3000);
    }

    return (
        <>
            <Navbar />
            <main className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
                <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">User Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar preview */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Avatar
                        </label>
                        <div className="mb-2">
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt="User avatar"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500">
                                    No Avatar
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="text-sm text-gray-600 dark:text-gray-300"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                    >
                        Save Profile
                    </button>
                </form>

                {/* Success message */}
                {message && (
                    <div className="mt-6 text-green-600 dark:text-green-400">
                        <p className="font-medium mb-4">{message}</p>
                        <div className="flex gap-4">
                            <Link href="/dashboard" className="underline text-blue-600 dark:text-blue-400">
                                Go to Dashboard
                            </Link>
                            <Link href="/courses" className="underline text-blue-600 dark:text-blue-400">
                                View My Courses
                            </Link>
                            <Link href="/profile" className="underline text-blue-600 dark:text-blue-400">
                                Stay on Profile
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
