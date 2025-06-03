import Navbar from '../components/NavBar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-blue-800">Welcome to the LMS</h1>
        <p className="mt-2 text-gray-700">Start learning today.</p>
      </main>
    </>
  );
}

