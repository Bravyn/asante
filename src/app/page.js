'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/NavBar';
import { FiSearch, FiArrowRight, FiStar, FiUsers, FiBookOpen, FiCheckCircle } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data fetch - replace with real API call
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockCourses = [
          {
            id: 1,
            title: 'English',
            instructor: 'Sarah Johnson',
            rating: 4.8,
            students: 1245,
            duration: '12 hours',
            category: 'language',
            featured: true,
            thumbnail: '/images/react-course.jpg'
          },
          {
            id: 2,
            title: 'Kiswahili',
            instructor: 'Michael Chen',
            rating: 4.6,
            students: 892,
            duration: '15 hours',
            category: 'data-science',
            featured: true,
            thumbnail: '/images/data-science.jpg'
          },
          {
            id: 3,
            title: 'Kenya Sign Language',
            instructor: 'Emma Rodriguez',
            rating: 4.9,
            students: 1567,
            duration: '10 hours',
            category: 'design',
            featured: false,
            thumbnail: '/images/design-course.jpg'
          },
          {
            id: 4,
            title: 'Home Science',
            instructor: 'David Wilson',
            rating: 4.5,
            students: 2301,
            duration: '8 hours',
            category: 'development',
            featured: false,
            thumbnail: '/images/python-course.jpg'
          },
          {
            id: 5,
            title: 'Agriculture',
            instructor: 'Lisa Zhang',
            rating: 4.7,
            students: 1103,
            duration: '20 hours',
            category: 'data-science',
            featured: true,
            thumbnail: '/images/ml-course.jpg'
          },
          {
            id: 6,
            title: 'Science and Technology',
            instructor: 'James Peterson',
            rating: 4.4,
            students: 745,
            duration: '6 hours',
            category: 'business',
            featured: false,
            thumbnail: '/images/marketing-course.jpg'
          }
        ];
        
        setCourses(mockCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || course.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const featuredCourses = courses.filter(course => course.featured);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn Without Limits</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Start, switch, or advance your learning path with 10+ learning areas from top instructors
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 text-xl" />
            </div>
            <input
              type="text"
              placeholder="What do you want to learn today?"
              className="w-full pl-12 pr-4 py-4 rounded-lg text-white-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-800 transition"
              onClick={() => router.push(`/courses?search=${encodeURIComponent(searchQuery)}`)}
            >
              Search <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-3xl font-bold text-blue-900 mb-2">100+</h3>
            <p className="text-gray-600">Learning Areas</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-3xl font-bold text-blue-900 mb-2">2000</h3>
            <p className="text-gray-600">Students</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-3xl font-bold text-blue-900 mb-2">50+</h3>
            <p className="text-gray-600">Instructors</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-3xl font-bold text-blue-900 mb-2">24/7</h3>
            <p className="text-gray-600">Learning Access</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Learning Areas</h2>
          <button 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            onClick={() => router.push('/courses')}
          >
            View all <FiArrowRight className="ml-1" />
          </button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/courses/${course.id}`)}
              >
                <div className="h-48 bg-gray-200 relative">
                  {/* In a real app, use next/image */}
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium flex items-center">
                    <FiStar className="mr-1" /> Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">By {course.instructor}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <FiStar className="text-yellow-500 mr-1" /> {course.rating}
                    </span>
                    <span className="flex items-center">
                      <FiUsers className="mr-1" /> {course.students.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <FiBookOpen className="mr-1" /> {course.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
            {['all', 'Languages', 'Arts', ' Integrated Science', 'Perfoming Arts', ' Environmental Activities'].map(category => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full whitespace-nowrap ${activeTab === category ? 'bg-blue-900 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'} transition`}
                onClick={() => setActiveTab(category)}
              >
                {category === 'all' ? 'All Categories' : 
                 category === 'data-science' ? 'Data Science' : 
                 category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredCourses.slice(0, 6).map(course => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push(`/courses/${course.id}`)}
                >
                  <div className="h-32 bg-gray-200 mb-4 rounded-md overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-3">By {course.instructor}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center text-yellow-600">
                      <FiStar className="mr-1" /> {course.rating}
                    </span>
                    <span className="text-blue-600 font-medium">View Course</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start learning?</h2>
          <p className="text-xl mb-8">Join thousands of students advancing their careers with our courses</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
              onClick={() => router.push('/signup')}
            >
              Sign Up for Free
            </button>
            <button 
              className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition"
              onClick={() => router.push('/courses')}
            >
              Browse Courses
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "This platform transformed my career. The courses are top-notch and the instructors are amazing.",
              author: "Alex Johnson",
              role: "Frontend Developer",
              rating: 5
            },
            {
              quote: "I doubled my salary within a year of completing courses here. Best investment ever!",
              author: "Maria Garcia",
              role: "Data Scientist",
              rating: 5
            },
            {
              quote: "The community and support make learning enjoyable and effective. Highly recommended!",
              author: "David Kim",
              role: "UX Designer",
              rating: 4
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'} mr-1`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCheckCircle className="text-blue-600 text-3xl mb-4" />,
                title: "Quality Content",
                description: "Courses created by industry experts with real-world relevance"
              },
              {
                icon: <FiUsers className="text-blue-600 text-3xl mb-4" />,
                title: "Community Support",
                description: "Join a network of learners and get help when you need it"
              },
              {
                icon: <FiBookOpen className="text-blue-600 text-3xl mb-4" />,
                title: "Flexible Learning",
                description: "Learn at your own pace, anytime and anywhere"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg text-center">
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}