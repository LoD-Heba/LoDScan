import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthHeader from "../components/auth/AuthHeader";
import SocialAuthButtons from "../components/auth/SocialAuthButtons";
import AuthToggle from "../components/auth/AuthToggle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Titulo from "../components/Titulo";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email no válido";

    if (!forgotPassword) {
      if (!password) newErrors.password = "La contraseña es requerida";
      else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";

      if (!isLogin && password !== confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    if (!isLogin && !name) newErrors.name = "El nombre es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    console.log(`Iniciando sesión con ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`Redirigiendo a ${provider}...`);
    }, 1000);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setErrors({});
    setMessage("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("");

    try {
      if (forgotPassword) {
        setMessage(
          "Se ha enviado un enlace a tu correo para restablecer la contraseña"
        );
      } else if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          setMessage(`Bienvenido ${result.user?.username || ""}`);
          const from = location.state?.from?.pathname || "/";
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1500);
        } else {
          setMessage(result.message || "Credenciales incorrectas");
        }
      } else {
        // Lógica de registro
        const response = await api.post("/users", {
          username: name,
          email,
          password,
          roleId: 7, // Asegúrate que este rol exista
        });

        setMessage("Registro exitoso! Por favor inicia sesión");
        setIsLogin(true); // Cambia a la vista de login
        resetForm(); // Limpia el formulario
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-[url('/img/epic.jpg')] bg-cover bg-fixed">
      <div className="sm:max-w-full bg-black bg-opacity-60 sm:bg-white sm:bg-opacity-90 shadow-lg md:max-w-[90%] mx-auto"></div>
      <div className="md:max-w-[90%] mx-auto dark:bg-gray-900 flex flex-col bg-white bg-opacity-70">
        <Titulo />
        <Navbar />

        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <AuthHeader isLogin={isLogin} forgotPassword={forgotPassword} />

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.includes("Bienvenido") || message.includes("éxito")
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                {message}
                {message.includes("Bienvenido") && (
                  <div className="mt-2 text-sm text-green-700">
                    Redirigiendo...
                  </div>
                )}
              </div>
            )}

            <AuthForm
              isLogin={isLogin}
              forgotPassword={forgotPassword}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              name={name}
              setName={setName}
              errors={errors}
              isLoading={isLoading}
              resetForm={resetForm}
              setForgotPassword={setForgotPassword}
              handleSubmit={handleSubmit}
            />

            {!forgotPassword && (
              <SocialAuthButtons
                isLogin={isLogin}
                isLoading={isLoading}
                handleSocialLogin={handleSocialLogin}
              />
            )}

            <AuthToggle
              isLogin={isLogin}
              forgotPassword={forgotPassword}
              resetForm={resetForm}
              setForgotPassword={setForgotPassword}
              setIsLogin={setIsLogin}
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AuthPage;
