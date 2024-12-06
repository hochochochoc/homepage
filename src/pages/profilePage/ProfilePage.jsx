import React, { useState } from "react";
import { ArrowLeft, Settings, CreditCard, Share, Lock } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative flex items-center bg-gray-700 px-4 py-5 text-white shadow">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/menu")}
        />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold">
          Profile
        </h1>
      </div>

      <div className="mx-auto w-full max-w-md flex-1 p-4">
        {user ? (
          <div className="flex h-full flex-col rounded-2xl bg-white shadow-lg">
            <div className="bg-gray-100 px-6 py-8 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {user.displayName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="flex-1 divide-y divide-gray-100">
              <div className="flex items-center px-6 py-6 hover:bg-gray-50">
                <Settings className="mr-4 h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-700">
                  Account Settings
                </span>
              </div>
              <div className="flex items-center px-6 py-6 hover:bg-gray-50">
                <CreditCard className="mr-4 h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-700">Subscription</span>
              </div>
              <div className="flex items-center px-6 py-6 hover:bg-gray-50">
                <Share className="mr-4 h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-700">
                  Connected Apps
                </span>
              </div>
              <div className="flex items-center px-6 py-6 hover:bg-gray-50">
                <Lock className="mr-4 h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-700">Privacy</span>
              </div>
            </div>

            <div className="mt-auto border-t border-gray-100 p-6">
              <button
                onClick={logout}
                className="w-full rounded-xl bg-gray-200 py-4 font-medium text-gray-700 transition-colors hover:bg-gray-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleEmailAuth} className="mb-6 space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 text-gray-800 focus:border-gray-300 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 text-gray-800 focus:border-gray-300 focus:outline-none"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-xl bg-gray-200 py-3 font-medium text-gray-700 hover:bg-gray-300"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="mb-6 w-full rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Continue with Google
            </button>

            <p className="text-center text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 font-medium text-gray-700 hover:text-gray-900"
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
