import Navbar from '../../components/NavBar';
import Link from 'next/link';

const courses = [
  { id: 'course-1', title: 'Intro to HTML', description: 'Learn the basics of HTML.' },
  { id: 'course-2', title: 'JavaScript Basics', description: 'Get started with JavaScript.' },
  { id: 'course-3', title: 'React for Beginners', description: 'Build apps using React.' },
];

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Available Courses</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map(course => (
            <div key={course.id} className="bg-white shadow rounded p-5 border hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-700">{course.title}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <Link
                href={`/courses/${course.id}`}
                className="inline-block mt-4 text-blue-800 hover:underline font-medium"
              >
                View Course →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
