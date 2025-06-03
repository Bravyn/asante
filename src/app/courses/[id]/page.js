'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/NavBar';

const courses = {
  'course-1': {
    title: 'Intro to HTML',
    description: 'Learn the basics of HTML, including tags, elements, and document structure.',
  },
  'course-2': {
    title: 'JavaScript Basics',
    description: 'Understand variables, functions, loops, and events in JavaScript.',
  },
  'course-3': {
    title: 'React for Beginners',
    description: 'Build components and manage state using React.',
  },
};

export default function CoursePage({ params }) {
  const courseId = params.id;
  const course = courses[courseId];

  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const enrolledList = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (enrolledList.includes(courseId)) setEnrolled(true);

    const storedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    if (storedProgress[courseId]) setProgress(storedProgress[courseId]);
  }, [courseId]);

  function handleEnroll() {
    const enrolledList = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledList.includes(courseId)) {
      enrolledList.push(courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledList));
      setEnrolled(true);
    }
  }

  function handleProgressChange() {
    const newProgress = Math.min(progress + 10, 100);
    const storedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    storedProgress[courseId] = newProgress;
    localStorage.setItem('courseProgress', JSON.stringify(storedProgress));
    setProgress(newProgress);
  }

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        {course ? (
          <div className="bg-white shadow rounded p-6 border space-y-4">
            <h1 className="text-2xl font-bold text-blue-800">{course.title}</h1>
            <p className="text-gray-700">{course.description}</p>

            {enrolled ? (
              <>
                <p className="text-green-600 font-medium">✅ You are enrolled in this course.</p>
                <div>
                  <p className="text-gray-700 mb-1">Progress: {progress}%</p>
                  <div className="w-full h-2 bg-gray-200 rounded">
                    <div className="h-full bg-blue-600 rounded" style={{ width: `${progress}%` }}></div>
                  </div>
                  {progress < 100 && (
                    <button
                      onClick={handleProgressChange}
                      className="mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Mark 10% Complete
                    </button>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800"
              >
                Enroll Now
              </button>
            )}
          </div>
        ) : (
          <p className="text-red-600 text-lg">Course not found.</p>
        )}
      </main>
    </>
  );
}
