import { BookOpen, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookClub = () => {
 

  const navigate = useNavigate();

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

          {/* Upcoming Events */}
          <div>
            <div className="mt-8 bg-gray-300 rounded-xl p-6 text-gray-900">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Join the Book Club</h4>
              <p className="text-gray-800 mb-4">
                Get access to exclusive discussions, author interviews, and implementation workshops.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-800">/month</span>
                </div>
                <button
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/checkout', {
                    state: {
                      product: {
                        name: 'Book Club Membership',
                        price: '$19',
                        description: 'Get access to exclusive discussions, author interviews, and implementation workshops.',
                        image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
                      }
                    }
                  })}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book Club Benefits */}
        <div className="bg-gray-300 rounded-2xl p-8 text-gray-900">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Book Club Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Curated Reading List</h4>
              <p className="text-gray-800 text-sm">Carefully selected books that accelerate your growth and success.</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Community Discussions</h4>
              <p className="text-gray-800 text-sm">Engage with like-minded individuals and share insights.</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Exclusive Content</h4>
              <p className="text-gray-800 text-sm">Access to author interviews and bonus materials.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClub;