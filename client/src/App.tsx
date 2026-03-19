import { useState } from 'react'
import TrackLibrary from './components/TrackLibrary'
import AddTrackForm from './components/AddTrackForm'
import TransitionFinder from './components/TransitionFinder'
import SetPlanner from './components/SetPlanner'
import SetHistory from './components/SetHistory'
import './index.css'

type Tab = 'library' | 'finder' | 'planner' | 'history';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('library');

  return (
    <div>
      <h1>DJ Set Tracker</h1>
      <p className="subtitle">Manage your tracks, plan sets, and find perfect transitions</p>

      <nav className="nav-tabs">
        <button className={`nav-tab ${activeTab === 'library' ? 'active' : ''}`} onClick={() => setActiveTab('library')}>
          Track Library
        </button>
        <button className={`nav-tab ${activeTab === 'finder' ? 'active' : ''}`} onClick={() => setActiveTab('finder')}>
          Transition Finder
        </button>
        <button className={`nav-tab ${activeTab === 'planner' ? 'active' : ''}`} onClick={() => setActiveTab('planner')}>
          Set Planner
        </button>
        <button className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          Set History
        </button>
      </nav>

      {activeTab === 'library' && (
        <>
          <AddTrackForm />
          <TrackLibrary />
        </>
      )}
      {activeTab === 'finder' && <TransitionFinder />}
      {activeTab === 'planner' && <SetPlanner />}
      {activeTab === 'history' && <SetHistory />}
    </div>
  )
}

export default App
