import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription API call
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-blue-600 rounded-lg p-8 text-white my-12">
      <h2 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h2>
      <p className="mb-6 text-blue-100">
        Get the latest blog posts and updates delivered to your inbox.
      </p>
      {subscribed ? (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Thank you for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
