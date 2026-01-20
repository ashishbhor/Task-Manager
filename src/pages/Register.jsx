import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useAuth(); // ✅ correct usage
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError("");

        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            // ✅ Create user via AuthContext
            const userCredential = await register(email, password);

            // ✅ Save username in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                username,
                email,
                createdAt: new Date(),
            });

            navigate("/");
        } catch (err) {
            setError(err.message.replace("Firebase:", ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

                {error && (
                    <p className="bg-red-100 text-red-700 p-2 mb-3 rounded text-sm">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value.replace(/[^a-zA-Z ]/g, ""))
                    }
                    className="w-full px-4 py-2 mb-2 border rounded-lg"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-2 border rounded-lg"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-2 border rounded-lg"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 mb-4 border rounded-lg"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
