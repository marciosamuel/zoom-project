import { type FormEventHandler, useState } from "react";
import { signInWithEmailPassword } from "../emailPasswordAuth";
import { signInWithGoogle } from "../googleAuth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signInWithEmailPassword(email, password);
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={handleGoogleLogin}>
        Login com Google
      </button>
    </div>
  );
};

export default Login;
