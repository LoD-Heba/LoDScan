import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Titulo from "../components/Titulo";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("");

    // Simular llamada a la API
    setTimeout(() => {
      setIsLoading(false);
      if (forgotPassword) {
        setMessage(`Se ha enviado un enlace de recuperación a ${email}`);
        setForgotPassword(false);
      } else {
        setMessage(isLogin ? "Inicio de sesión exitoso" : "Registro exitoso");
        // Aquí redirigirías al usuario o manejarías la autenticación
      }
    }, 1500);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Aquí integrarías con Firebase Auth o similar
    console.log(`Iniciando sesión con ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`Redirigiendo a ${provider}...`);
    }, 1000);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setErrors({});
    setMessage("");
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="bg-[url('/img/epic.jpg')] bg-cover bg-fixed">
      <div className="sm:max-w-full bg-black bg-opacity-60 sm:bg-white sm:bg-opacity-90 shadow-lg md:max-w-[90%] mx-auto"></div>
      <div className="md:max-w-[90%] mx-auto dark:bg-gray-900 flex flex-col bg-white bg-opacity-70">
        <Titulo />
        <Navbar />

        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold dark:text-white">
                {forgotPassword
                  ? "Recuperar contraseña"
                  : isLogin
                  ? "Inicia sesión en tu cuenta"
                  : "Crea una nueva cuenta"}
              </h2>
              <p className="mt-2 text-2x1 text-gray-600 dark:text-gray-400 font-medium">
                {forgotPassword
                  ? "Ingresa tu email para recibir instrucciones"
                  : isLogin
                  ? "O usa tu cuenta de redes sociales"
                  : "Comienza a disfrutar de todas las funciones"}
              </p>
            </div>

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.includes("éxito")
                    ? "bg-green-50 text-green-800"
                    : "bg-blue-50 text-blue-800"
                }`}
              >
                {message}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {!forgotPassword && !isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.name
                        ? "border-red-300"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.email
                      ? "border-red-300"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {!forgotPassword && (
                <>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={
                        isLogin ? "current-password" : "new-password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`mt-1 block w-full px-3 py-2 border ${
                        errors.password
                          ? "border-red-300"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Confirmar contraseña
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          errors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300 dark:border-gray-600"
                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white`}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              {isLogin && !forgotPassword && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                    >
                      Recuérdame
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setForgotPassword(true);
                      }}
                      className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Procesando...
                    </>
                  ) : forgotPassword ? (
                    "Enviar enlace"
                  ) : isLogin ? (
                    "Iniciar sesión"
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </div>
            </form>

            {!forgotPassword && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                      {isLogin ? "O continúa con" : "O regístrate con"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin("GitHub")}
                    disabled={isLoading}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2">GitHub</span>
                  </button>
                </div>
              </div>
            )}

            <div className="text-center text-sm">
              {forgotPassword ? (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setForgotPassword(false);
                    setIsLogin(true);
                  }}
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  ← Volver a inicio de sesión
                </button>
              ) : (
                <>
                  {isLogin
                    ? "¿No tienes una cuenta? "
                    : "¿Ya tienes una cuenta? "}
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setIsLogin(!isLogin);
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {isLogin ? "Regístrate" : "Inicia sesión"}
                  </button>
                </>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AuthPage;
