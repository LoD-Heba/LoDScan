import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Redirección automática después de 8 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl">
          {/* Ilustración SVG (puedes reemplazar por una imagen) */}
          <div className="mx-auto w-64 h-64 mb-8">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-indigo-400 dark:text-indigo-600">
              <path
                fill="currentColor"
                d="M40,-74.3C52.1,-69.2,62.3,-59.1,69.7,-46.8C77.1,-34.5,81.7,-20.1,82.2,-5.7C82.7,8.7,79.2,23.1,71.1,35.1C63,47.1,50.4,56.7,36.6,65.7C22.8,74.7,7.9,83.1,-7.3,83.3C-22.5,83.5,-45,75.5,-58.6,63.1C-72.2,50.7,-76.8,33.9,-78.1,17.2C-79.5,0.5,-77.5,-16.1,-69.4,-29.6C-61.3,-43.1,-47,-53.5,-33.1,-58.1C-19.2,-62.7,-5.6,-61.5,8.7,-58.8C23,-56.1,45.9,-51.9,40,-74.3Z"
                transform="translate(100 100)"
              />
              <text
                x="100"
                y="100"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="48"
                fontFamily="Arial"
                fontWeight="bold"
                transform="rotate(5 100 100)"
              >
                404
              </text>
            </svg>
          </div>

          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">Página no encontrada</h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>

          <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md inline-block">
            <p className="text-gray-500 dark:text-gray-400">
              Serás redirigido automáticamente a la página de inicio en <span className="font-bold text-indigo-600 dark:text-indigo-400">8 segundos</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-lg hover:shadow-indigo-300 dark:hover:shadow-indigo-800"
            >
              Volver al inicio
            </Link>
            
            <Link
              to="/discover"
              className="px-6 py-3 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-gray-300 dark:hover:shadow-gray-800"
            >
              Descubrir novelas
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;