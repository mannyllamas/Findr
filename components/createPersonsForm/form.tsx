'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  current_city?: string;
  iso_housing: boolean;
  iso_roommate: boolean;
  person_type: 'intern' | 'contact';
}

export default function CreatePersonForm() {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    current_city: '',
    iso_housing: false,
    iso_roommate: false,
    person_type: 'intern',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [target.name]: target.type === 'checkbox' ? target.checked : target.value,
      });
    } else if (target instanceof HTMLSelectElement) {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/postRequests/createPerson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: `Person created successfully: ${data.first_name} ${data.last_name}` });
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          current_city: '',
          iso_housing: false,
          iso_roommate: false,
          person_type: 'intern',
        });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to create person' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h1 className="text-2xl font-bold mb-6">Create a Person</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form Fields */}
      <div className="mb-4">
        <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Similar fields for last_name, email, phone_number, current_city */}
      {/* Preferences Fields */}

      {/* Last Name Field */}
<div className="mb-4">
  <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
    Last Name
  </label>
  <input
    type="text"
    id="last_name"
    name="last_name"
    value={formData.last_name}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    required
  />
</div>

{/* Email Field */}
<div className="mb-4">
  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    required
  />
</div>

{/* Phone Number Field */}
<div className="mb-4">
  <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">
    Phone Number
  </label>
  <input
    type="text"
    id="phone_number"
    name="phone_number"
    value={formData.phone_number}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Preferences</label>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="iso_housing"
              checked={formData.iso_housing}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">ISO Housing</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="iso_roommate"
              checked={formData.iso_roommate}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2">ISO Roommate</span>
          </label>
        </div>
      </div>

      {/* Person Type */}
      <div className="mb-4">
        <label htmlFor="person_type" className="block text-gray-700 text-sm font-bold mb-2">
          Person Type
        </label>
        <select
          id="person_type"
          name="person_type"
          value={formData.person_type}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="intern">Intern</option>
          <option value="contact">Contact</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Create Person'}
        </button>
      </div>
    </form>
  );
}
