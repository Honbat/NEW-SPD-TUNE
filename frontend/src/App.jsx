import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ClanBoss from './pages/ClanBoss'
import Hydra from './pages/Hydra'
import Chimera from './pages/Chimera'

export default function App(){
  const [champions, setChampions] = useState([])

  useEffect(()=>{
    fetch('/champions.json')
      .then(r=>r.json())
      .then(j=> setChampions(j.champions || []))
      .catch(err => { console.error('champions.json load failed', err) })
  },[])

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1 className="text-2xl font-bold">RSL Speed Tuner — Modern DWJ</h1>
          <div className="muted">Clan Boss • Hydra • Chimera — ratio tuning, cooldown offsets, tie avoidance</div>
        </div>
        <nav className="ml-auto flex gap-3">
          <Link to="/" className="text-sky-300 hover:underline">Clan Boss</Link>
          <Link to="/hydra" className="text-sky-300 hover:underline">Hydra</Link>
          <Link to="/chimera" className="text-sky-300 hover:underline">Chimera</Link>
        </nav>
      </header>

      <div className="card">
        <Routes>
          <Route path="/" element={<ClanBoss champions={champions} />} />
          <Route path="/hydra" element={<Hydra champions={champions} />} />
          <Route path="/chimera" element={<Chimera champions={champions} />} />
        </Routes>
      </div>

      <footer className="muted">Deploy via Vercel or Netlify · Use the scraper for full champion updates</footer>
    </div>
  )
}
