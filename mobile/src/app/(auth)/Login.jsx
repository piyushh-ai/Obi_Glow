import { useAuth } from "../../features/auth/hooks/useAuth.js";
import LoginPage from "../../features/auth/pages/LoginPage.jsx";

const Login = () => {
  const { signIn } = useAuth();

  return <LoginPage signIn={signIn} />;
};

export default Login;
