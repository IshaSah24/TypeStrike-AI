// src/components/AuthButton.jsx
export default function AuthButton({ text }) {
    return (
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        {text}
      </button>
    );
  }
  