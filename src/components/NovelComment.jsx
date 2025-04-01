import { useState } from 'react';
import { useParams } from 'react-router-dom';

const CommentsSection = ({ type }) => {
  const { id } = useParams();
  const [comments, setComments] = useState([
    {
      id: 1,
      content: '¡Esta novela es increíble! Me encanta cómo desarrollan los personajes.',
      userId: 101,
      user: {
        username: 'lector_apasionado',
        avatar: '/img/default-avatar.webp'
      },
      createdAt: '2023-05-15T10:30:00Z',
      replies: [
        {
          id: 2,
          content: 'Totalmente de acuerdo, especialmente con el desarrollo del protagonista.',
          userId: 102,
          user: {
            username: 'fan_anime',
            avatar: '/img/default-avatar.webp'
          },
          createdAt: '2023-05-15T11:45:00Z',
          replies: []
        }
      ]
    },
    {
      id: 3,
      content: '¿Alguien sabe cuándo sale el próximo capítulo?',
      userId: 103,
      user: {
        username: 'esperando_ansioso',
        avatar: '/img/default-avatar.webp'
      },
      createdAt: '2023-05-14T09:15:00Z',
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentUser] = useState({
    id: 100,
    username: 'yo',
    avatar: '/img/default-avatar.webp'
  });

  // Generar un ID único simple para nuevos comentarios
  const generateId = () => Math.max(...comments.flatMap(c => [c.id, ...c.replies.map(r => r.id)]), 0) + 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      id: generateId(),
      content: newComment,
      userId: currentUser.id,
      user: currentUser,
      createdAt: new Date().toISOString(),
      replies: []
    };

    if (replyingTo) {
      // Añadir como respuesta
      setComments(comments.map(comment => 
        comment.id === replyingTo 
          ? { ...comment, replies: [...comment.replies, commentData] }
          : comment
      ));
    } else {
      // Añadir como nuevo comentario principal
      setComments([commentData, ...comments]);
    }

    setNewComment('');
    setReplyingTo(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Comentarios</h3>
      
      {/* Formulario para nuevo comentario */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={replyingTo ? 'Escribe tu respuesta...' : 'Añade un comentario...'}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          rows="3"
        />
        <div className="flex justify-end mt-2 space-x-2">
          {replyingTo && (
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {replyingTo ? 'Responder' : 'Comentar'}
          </button>
        </div>
      </form>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={() => setReplyingTo(comment.id)}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Componente de comentario individual
const CommentItem = ({ comment, onReply, currentUser }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <img 
          src={comment.user.avatar} 
          alt={comment.user.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold dark:text-white">{comment.user.username}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            {comment.userId === currentUser.id && (
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">
                Tú
              </span>
            )}
          </div>
          <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.content}</p>
          
          <div className="flex items-center mt-2 space-x-4 text-sm">
            <button
              onClick={() => onReply()}
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Responder
            </button>
          </div>
        </div>
      </div>

      {/* Respuestas */}
      {comment.replies?.length > 0 && (
        <div className="mt-4 pl-8 border-l-2 border-gray-200 dark:border-gray-600">
          {showReplies ? (
            <>
              {comment.replies.map((reply) => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  onReply={onReply}
                  currentUser={currentUser}
                />
              ))}
              <button
                onClick={() => setShowReplies(false)}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-2"
              >
                Ocultar respuestas
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowReplies(true)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Ver {comment.replies.length} {comment.replies.length === 1 ? 'respuesta' : 'respuestas'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;