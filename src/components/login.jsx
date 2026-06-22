import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { tokenStorage } from "../utils/tokenStorage";
import AuthShell from "./ui/AuthShell";
import FormField from "./ui/FormField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = await authService.login(email, password);

    if (data.token) {
      tokenStorage.set(data.token);
      navigate("/notes");
      return;
    }

    setError(data.error);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue writing and organizing your notes."
    >
      <div className="space-y-4">
        <FormField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <FormField
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

        <button
          className="w-full rounded-xl bg-emerald-700 p-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          onClick={() => {
            window.location.href = authService.getGoogleLoginUrl();
          }}
          className="w-full rounded-xl border border-stone-200 bg-white p-3 font-semibold text-stone-800 transition hover:bg-stone-100"
        >
          Login with Google
        </button>

        <p className="text-center text-sm text-stone-600">
          No account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-semibold text-emerald-700"
          >
            Register
          </button>
        </p>
      </div>
    </AuthShell>
  );
};

export default Login;
