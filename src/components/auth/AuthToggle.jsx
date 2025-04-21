import React from 'react'

const AuthToggle = ({
  isLogin,
  forgotPassword,
  resetForm,
  setForgotPassword,
  setIsLogin,
}) => {
  return (
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
          {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
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
  );
};

export default AuthToggle;