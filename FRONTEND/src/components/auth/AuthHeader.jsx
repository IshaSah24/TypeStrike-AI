// src/components/AuthHeader.jsx
export default function AuthHeader({ isLogin }) {
    return (
      <>
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Sign In to Your Account" : "Create an Account"}
        </h2>
      </>
    );
  }
  