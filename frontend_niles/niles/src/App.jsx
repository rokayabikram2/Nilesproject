import React, { useEffect, useRef, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Category from "./pages/category/Category";
import Contact from "./pages/contact/Contact";
import Homepage from "./pages/home/Homepage";
import NewspaperVacancy from "./pages/job/NewspaperVacancy";
import WhoWeAre from "./pages/about/WhoWeAre";
import ChairmanMessage from "./pages/about/ChairmanMessage";
import CompanyProfile from "./pages/about/CompanyProfile";
import Vacancy from "./pages/job/Vacancy";
import Gallery from "./pages/about/Gallery";
import RequiredDocument from "./pages/service/RequiredDocument";
import OrganizationChart from "./pages/about/OrganizationChart";
import Objective from "./pages/about/Objective";
import RecruitmentProcess from "./pages/service/RecruitmentProcess";
import GoToTopButton from './components/GoToTopButton';
import Unskilled from './pages/category/Unskilled';
import Skilled from './pages/category/Skilled';
import SemiSkilled from './pages/category/SemiSkilled';
import HighSkilled from './pages/category/HighSkilled';
import ClientCandidateMatching from './pages/service/ClientCandidateMatching';
import IndustryExpertise from './pages/service/IndustryExpertise';
import OfferDetail from './pages/home/OfferDetail';
import LegalDocument from './pages/about/LegalDocument';
import MissionVision from './pages/about/MissionVision';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from './components/PageNotFound';

function App() {
  const animatedRef = useRef(false);
  useEffect(() => {
    if (!animatedRef.current) {
      Aos.init();
      animatedRef.current = true;
    }
  }, []);
  const routeConfigurations = [
    { path: '/', element: <Homepage /> },
    { path: '/Offer/:id', element: <OfferDetail /> },
    { path: '/WhoWeAre', element: <WhoWeAre /> },
    { path: "/CompanyProfile", element: <CompanyProfile /> },
    { path: "/ChairmanMessage", element: <ChairmanMessage /> },
    { path: "/MissionVision", element: <MissionVision /> },
    { path: "/Objective", element: <Objective /> },
    { path: "/OrganizationChart", element: <OrganizationChart /> },
    { path: "/LegalDocument", element: <LegalDocument /> },
    { path: "/Gallery", element: <Gallery /> },
    { path: "/RequiredDocument", element: <RequiredDocument /> },
    { path: "/RecruitmentProcess", element: <RecruitmentProcess /> },
    { path: "/ClientCandidateMatching", element: <ClientCandidateMatching /> },
    { path: "/IndustryExpertise", element: <IndustryExpertise /> },
    { path: "/Vacancy", element: <Vacancy /> },
    { path: "/NewspaperVacancy", element: <NewspaperVacancy /> },
    { path: "/Category", element: <Category /> },
    { path: "/Unskilled", element: <Unskilled /> },
    { path: "/SemiSkilled", element: <SemiSkilled /> },
    { path: "/Skilled", element: <Skilled /> },
    { path: "/HighSkilled", element: <HighSkilled /> },
    { path: "/Contact", element: <Contact /> },
  ];

  const isRouteMatched = routeConfigurations.some((config) =>
    window.location.pathname === config.path
  );

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {routeConfigurations.map((config, index) => (
            <Route key={index} exact {...config} />
          ))}
          {!isRouteMatched && (
            <Route path='*' element={<PageNotFound />} />
          )}
        </Routes>
        <Footer />
        <GoToTopButton />
      </Router>
    </>
  );
}

export default App;
