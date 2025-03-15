"use client"

import { useState, FormEvent } from 'react';

const WaitlistSection = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScvS415wKF4WF0aeiGgh1UOs1GjxKn3xD3DRNCJR90IrQnyXQ/formResponse';
    const formData = new FormData();
    formData.append('entry.1569025193', email);

    try {
      // Using fetch with no-cors mode because Google Forms doesn't support CORS
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      // Since no-cors doesn't return readable response, we assume success if no error is thrown
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">
        📩 Join the Waitlist & Get Early Access!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Enter your email to be the first to try new features
      </p>
      
      {isSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative max-w-md mx-auto">
          <strong className="font-bold">Thanks for joining!</strong>
          <p className="block sm:inline"> We'll be in touch soon.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:flex-row justify-center items-center w-full max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            required
            className="px-4 py-3 text-lg border rounded-lg w-full md:w-96"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`${
              isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : '🚀 Join the Waitlist'}
          </button>
        </form>
      )}
      
      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}
    </section>
  );
};

export default WaitlistSection;