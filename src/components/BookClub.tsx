import { BookOpen, Users, Calendar, Star } from 'lucide-react';

const BookClub = () => {
  const featuredBooks = [
    {
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Classic financial education that challenges conventional thinking about money and investing.',
      rating: 4.8,
      members: 2847,
      category: 'Personal Finance'
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Revolutionary approach to building successful startups through validated learning.',
      rating: 4.6,
      members: 1923,
      category: 'Entrepreneurship'
    },
    {
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Timeless principles for achieving wealth and success through mindset transformation.',
      rating: 4.9,
      members: 3156,
      category: 'Success'
    }
  ];

  const upcomingEvents = [
    {
      date: 'Jan 15',
      title: 'Monthly Book Discussion',
      book: 'Atomic Habits',
      time: '7:00 PM EST'
    },
    {
      date: 'Jan 22',
      title: 'Author Q&A Session',
      book: 'The Psychology of Money',
      time: '6:30 PM EST'
    },
    {
      date: 'Jan 29',
      title: 'Implementation Workshop',
      book: 'The 7 Habits of Highly Effective People',
      time: '8:00 PM EST'
    }
  ];

  return (
    <section id="bookclub" className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Affluent Book Club
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community of readers who are committed to continuous learning and personal growth through powerful literature.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Featured Books */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <BookOpen className="h-6 w-6 mr-3 text-gray-500" />
              Currently Reading
            </h3>
            <div className="space-y-6">
              {featuredBooks.map((book, index) => (
                <div key={index} className="group bg-black rounded-xl p-6 hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 text-gray-300">
                  <div className="flex space-x-4">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-300">{book.title}</h4>
                          <p className="text-gray-300">by {book.author}</p>
                        </div>
                        <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 px-2 py-1 rounded-full text-xs font-semibold">
                          {book.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{book.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-gray-300 fill-current" />
                            <span className="text-sm font-semibold text-gray-300">{book.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-300" />
                            <span className="text-sm text-gray-300">{book.members.toLocaleString()}</span>
                          </div>
                        </div>
                        <button className="text-gray-300 font-semibold text-sm hover:text-gray-300 transition-colors">
                          Join Discussion →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-blue-500" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-black rounded-xl p-6 hover:bg-gray-900 transition-all duration-300 text-gray-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 rounded-lg p-3 text-center min-w-[60px]">
                      <div className="text-lg font-bold">{event.date.split(' ')[1]}</div>
                      <div className="text-xs">{event.date.split(' ')[0]}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-300 mb-1">{event.title}</h4>
                      <p className="text-gray-300 mb-1">{event.book}</p>
                      <p className="text-sm text-gray-300">{event.time}</p>
                    </div>
                    <button className="bg-gray-900 text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-black rounded-xl p-6 text-gray-300">
              <h4 className="text-xl font-bold mb-3">Join the Book Club</h4>
              <p className="text-gray-300 mb-4">
                Get access to exclusive discussions, author interviews, and implementation workshops.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-400">$19</span>
                  <span className="text-gray-300">/month</span>
                </div>
                <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book Club Benefits */}
        <div className="bg-black rounded-2xl p-8 text-gray-300">
          <h3 className="text-2xl font-bold text-gray-300 mb-6 text-center">Book Club Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-gray-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Curated Reading List</h4>
              <p className="text-gray-300 text-sm">Carefully selected books that accelerate your growth and success.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-gray-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Community Discussions</h4>
              <p className="text-gray-300 text-sm">Engage with like-minded individuals and share insights.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-700 to-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-gray-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-300 mb-2">Exclusive Content</h4>
              <p className="text-gray-300 text-sm">Access to author interviews and bonus materials.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClub;