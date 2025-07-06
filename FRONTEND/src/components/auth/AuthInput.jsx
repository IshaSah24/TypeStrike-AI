// src/components/AuthInput.jsx
export default function AuthInput({ label, type, placeholder, value, onChange }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    );
  }
  