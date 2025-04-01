import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Discover from "../pages/Discover";
import NovelDetail from "../pages/NovelDetail";
import ChapterReader from "../pages/ChapterReader";
import UserProfile from "../pages/UserProfile";
import SearchComponent from "../components/SearchComponent";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from '../pages/NotFoundPage';
import CommentsSection from '../components/NovelComment';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/novela/:id" element={<NovelDetail />} />
      <Route path="/capitulo/:novelId/:chapterId" element={<ChapterReader />} />
      <Route path="/perfil" element={<UserProfile />} />
      <Route path="/buscar" element={<SearchComponent />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/registro" element={<AuthPage initialMode="register" />} />
      
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};
