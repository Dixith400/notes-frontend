import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import AuthShell from "./ui/AuthShell";
import FormField from "./ui/FormField";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const data = await authService.register(email, password);

    if (data.message) {
      navigate("/notes");
      return;
    }

    setError(data.error);
  };

  return (
    <AuthShell
      title="Create account"
      subtitle="Register with your email and start keeping your notes in one place."
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
          placeholder="Choose a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

        <button
          className="w-full rounded-xl bg-emerald-700 p-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
          onClick={handleClick}
        >
          Register
        </button>

        <p className="text-center text-sm text-stone-600">
          Already have an account?{" "}
          <button
            className="font-semibold text-emerald-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </AuthShell>
  );
};

export default Register;
