"use client"
import { useState } from 'react';

export const Form = () => {
  const [formData, setFormData] = useState({
    First: '',
    Last: '',
    Email: '',
    Location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);

    // Simulate form submission (replace with your actual submission logic)
    try {
      // const response = await fetch('/api/submit', { // Replace '/api/submit' with your API endpoint
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (response.ok) {
      //   console.log('Form submitted successfully!');
      //   // Optionally reset the form
      //   setFormData({
      //     First: '',
      //     Last: '',
      //     Email: '',
      //     Location: '',
      //   });
      // } else {
      //   console.error('Form submission failed.');
      // }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted successfully!');
            setFormData({
        First: '',
        Last: '',
        Email: '',
        Location: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <div className="mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          <strong className="text-black">Write us</strong>
        </h5>
        <p className="text-gray-600">We'd love to hear from you!</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <label className="block w-1/2">
            <p className="text-gray-700 text-sm font-bold mb-2">First name</p>
            <input
              type="text"
              required
              name="First"
              placeholder="Jane"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.First}
              onChange={handleChange}
            />
          </label>
          <label className="block w-1/2">
            <p className="text-gray-700 text-sm font-bold mb-2">Last name</p>
            <input
              type="text"
              required
              name="Last"
              placeholder="Smith"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.Last}
              onChange={handleChange}
            />
          </label>
        </div>
        <label className="block">
          <p className="text-gray-700 text-sm font-bold mb-2">Email</p>
          <input
            type="email"
            required
            name="Email"
            placeholder="jane@example.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.Email}
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <p className="text-gray-700 text-sm font-bold mb-2">Location</p>
          <select
            name="Location"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.Location}
            onChange={handleChange}
          >
            <option value="" disabled >
              Select…
            </option>
            <option value="amsterdam">Amsterdam</option>
            <option value="barcelona">Barcelona</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};