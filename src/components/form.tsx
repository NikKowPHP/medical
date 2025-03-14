"use client"
import { ChevronDownIcon } from 'lucide-react';
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
    <div className="bg-white rounded-3xl border border-gray-200 p-6 w-full max-w-md mx-auto">
      <div className="mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          <strong className="text-black">Write us</strong>
        </h5>
        <p className="text-gray-600">We'd love to hear from you!</p>
      </div>
      <form className="space-y-6 pt-6 text-[16px]" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-[20px]">
          <label className="block md:w-1/2 ">
            <p className="text-gray-700   mb-2">First name</p>
            <input
              type="text"
              required
              name="First"
              placeholder="Jane"
              className=" appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 border-gray-200 leading-tight focus:outline-none focus:border-gray-300"
              value={formData.First}
              onChange={handleChange}
            />
          </label>
          <label className="block md:w-1/2">
            <p className="text-gray-700   mb-2">Last name</p>
            <input
              type="text"
              required
              name="Last"
              placeholder="Smith"
              className=" appearance-none border rounded-lg  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
              value={formData.Last}
              onChange={handleChange}
            />
          </label>
        </div>
        <label className="block">
          <p className="text-gray-700  mb-2">Email</p>
          <input
            type="email"
            required
            name="Email"
            placeholder="jane@example.com"
            className=" appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
            value={formData.Email}
            onChange={handleChange}
          />
        </label>
        <label className="block">
          <p className="text-gray-700  mb-2">Location</p>
          <div className="relative">

          <select
            name="Location"
            required
            className=" appearance-none border bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-300"
            value={formData.Location}
            onChange={handleChange}
          >
            <option value="" disabled >
              Select…
            </option>
            <option value="amsterdam">Amsterdam</option>
            <option value="barcelona">Barcelona</option>
          </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </label>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 rounded-lg text-white w-full py-2 px-4  focus:outline-none focus:border-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};