import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import Project from "./pages/Project/Project";
import Communities from "./pages/Communities/Communities";
import Community from "./pages/Community/Community";
import ScrapsPage from "./pages/Scraps/ScrapsPage";
import TestimonialsPage from "./pages/Testimonials/TestimonialsPage";

import MobileBottomNav from "./components/MobileBottomNav/MobileBottomNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/projects/:slug" element={<Project />} />

        <Route path="/communities" element={<Communities />} />

        <Route path="/communities/:slug" element={<Community />} />

        <Route path="/scraps" element={<ScrapsPage />} />

        <Route path="/testimonials" element={<TestimonialsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <MobileBottomNav />
    </BrowserRouter>
  );
}

export default App;
