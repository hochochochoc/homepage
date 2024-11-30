// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, googleSignIn, emailSignIn, emailSignUp, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await emailSignUp(email, password);
      } else {
        await emailSignIn(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen bg-blue-50">
      <div className="relative flex items-center bg-gray-700 px-4 py-5 text-white shadow">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate("/")} />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
          Profile
        </h1>
      </div>

      <div className="mx-auto max-w-md p-6">
        {user ? (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
              Profile
            </h2>
            <div className="mb-4">
              <p className="text-gray-600">Email: {user.email}</p>
              {user.displayName && (
                <p className="text-gray-600">Name: {user.displayName}</p>
              )}
            </div>
            <button
              onClick={logout}
              className="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>

            <form onSubmit={handleEmailAuth} className="mb-4 space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border p-2 text-gray-800"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border p-2 text-gray-800"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="mb-4 w-full rounded-lg border border-gray-300 bg-white py-2 text-gray-800 hover:bg-gray-50"
            >
              Continue with Google
            </button>

            <p className="text-center text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-blue-500 hover:text-blue-600"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
