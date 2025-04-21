import React from 'react'

const AuthHeader = ({ isLogin, forgotPassword }) => {
  return (
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
  );
};

export default AuthHeader;