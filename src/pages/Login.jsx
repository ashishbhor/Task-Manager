import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {

            if (err.code === "auth/user-not-found") {
                setError("No account found with this email");
            } else if (err.code === "auth/wrong-password") {
                setError("Incorrect password");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email format");
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-6">
                    Sign in to manage your tasks
                </p>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full py-3 rounded font-semibold transition
    ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"}
  `}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>


                <p className="text-center text-sm mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
