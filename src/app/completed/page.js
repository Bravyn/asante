'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/NavBar';

export default function CompletedCoursesPage() {
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('completedCourses');
    if (stored) {
      setCompletedCourses(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 mt-8 bg-white dark:bg-gray-800 rounded shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Completed Courses</h1>

        {completedCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">You haven't completed any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {completedCourses.map(course => (
              <li key={course.id} className="p-4 border rounded dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{course.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
                <Link
                  href={`/courses/${course.id}`}
                  className="text-blue-600 hover:underline dark:text-blue-400 mt-2 inline-block"
                >
                  View Course Again
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
