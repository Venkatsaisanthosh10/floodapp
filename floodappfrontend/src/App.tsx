import { Routes, Route} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/queryClient';
import './App.css';
import Header from './components/header';
import Login from './components/Login';
import AlertBanner from './components/AlertBanner';
import RiskAssessmentPanel from './components/RiskAssessmentPanel';
import GISMapPanel from './components/GISMapPanel';
import ResponseActionsPanel from './components/ResponseActionsPanel';
import ResourceManagementPanel from './components/ResourceManagementPanel';
import CommunicationPanel from './components/CommunicationPanel';
import ResourceViewer from './components/ResourceViewer';
import EvacuationManager from './components/EvacuationManager';
import ResourceStatusUpdates from './components/ResourceStatusUpdates';

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public Login Route */}
        <Route path="/" element={<Login/>} />
        <Route path="/main" element={
          <>
            <Header />
            <AlertBanner />
            <div className="dashboard">
              <RiskAssessmentPanel />
              <GISMapPanel />
              <ResponseActionsPanel />
            </div>
            <ResourceManagementPanel />
            <CommunicationPanel />
          </>
        } />
        <Route path="/resource-viewer" element={
          <>
            <ResourceViewer />
          </>
        } />
        <Route path="/evacuation-manager" element={
          <>
            <EvacuationManager />
          </>
        } />
        <Route path="/resource-status" element={
          <>
            <ResourceStatusUpdates />
          </>
        } />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
