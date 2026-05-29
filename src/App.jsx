import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GameConfigProvider } from './contexts/GameConfigContext';
import LandingPage from './LandingPage';
import PageTransition from './components/PageTransition';

import DiagnosticChallengePage from './pages/DiagnosticChallengePage';
import AntibioChallengePage from './pages/AntibioChallengePage';
import ChallengeEcgPage from './pages/ChallengeEcgPage';
import ImagiologyChallengePage from './pages/ImagiologyChallengePage';

function App() {
  const location = useLocation();

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      <GameConfigProvider>
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            } />
            <Route path="/modulos/desafio-diagnostico" element={
              <PageTransition>
                <DiagnosticChallengePage />
              </PageTransition>
            } />
            <Route path="/modulos/antibioticoterapia" element={
              <PageTransition>
                <AntibioChallengePage />
              </PageTransition>
            } />
            <Route path="/modulos/desafioecg" element={
              <PageTransition>
                <ChallengeEcgPage />
              </PageTransition>
            } />
            <Route path="/modulos/imaginologia" element={
              <PageTransition>
                <ImagiologyChallengePage />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </GameConfigProvider>
    </div>
  );
}

export default App;
