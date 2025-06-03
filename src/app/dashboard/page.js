'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar';
import Link from 'next/link';

const allCourses = {
  'course-1': { title: 'Intro to HTML' },
  'course-2': { title: 'JavaScript Basics' },
  'course-3': { title: 'React for Beginners' },
};

export default function Dashboard() {
  const [email, setEmail] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedEnrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const storedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');

    if (storedEmail) setEmail(storedEmail);
    setEnrolledCourses(storedEnrolled);
    setProgress(storedProgress);
  }, []);

  function handleUnenroll(courseId) {
    const updated = enrolledCourses.filter(id => id !== courseId);
    localStorage.setItem('enrolledCourses', JSON.stringify(updated));

    // Optionally remove progress too:
    const updatedProgress = { ...progress };
    delete updatedProgress[courseId];
    localStorage.setItem('courseProgress', JSON.stringify(updatedProgress));

    setEnrolledCourses(updated);
    setProgress(updatedProgress);
  }

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-blue-800">Welcome back{email ? `, ${email}` : ''}!</h2>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-blue-700">My Enrolled Courses</h3>
          {enrolledCourses.length === 0 ? (
            <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-4">
              {enrolledCourses.map(courseId => {
                const course = allCourses[courseId];
                if (!course) return null;

                const currentProgress = progress[courseId] || 0;

                return (
                  <li key={courseId} className="bg-white border shadow rounded p-4 space-y-2">
                    <h4 className="text-lg font-medium text-blue-900">{course.title}</h4>
                    
                    <p className="text-sm text-gray-700">
                      Progress: {currentProgress}%
                      <div className="w-full h-2 bg-gray-200 rounded mt-1">
                        <div className="h-full bg-blue-600 rounded" style={{ width: `${currentProgress}%` }}></div>
                      </div>
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <Link
                        href={`/courses/${courseId}`}
                        className="text-sm text-blue-700 hover:underline"
                      >
                        Continue →
                      </Link>
                      <button
                        onClick={() => handleUnenroll(courseId)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Unenroll
                      </button>
                    </div>
                    
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
