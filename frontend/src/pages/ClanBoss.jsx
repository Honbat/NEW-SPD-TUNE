import React, { useState } from 'react'
import TunerTable from '../components/TunerTable'
import { computeDWJTunedTeam } from '../utils/dwj_tuner'

export default function ClanBoss({ champions }) {
  const defaultTeam = Array.from({length:15}).map((_,i)=>({ slot:i+1, name:'', id:null, base_spd:null, offset:0, tune_ratio:'4:3', boss_type:'Clan Boss', primary_cd:4 }))
  const [team, setTeam] = useState(defaultTeam)
  const [refId, setRefId] = useState(null)
  const referenceTargets = { clan: 200, hydra: 220, chimera: 210 }

  function onCompute(){
    try {
      const computed = computeDWJTunedTeam(team, refId, referenceTargets, {applyCooldownAlignment:true})
      setTeam(computed)
    } catch (e) { alert(e.message) }
  }

  function onExport(){
    const rows = [['Slot','Champion','Base','Offset','Effective','Ratio','Tuned']]
    team.forEach((t,i) => rows.push([i+1,t.name||'',t.base_spd||'',t.offset||0,(t.base_spd||0)+(t.offset||0),t.tune_ratio||'',t.tuned||'']))
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob)
    const a=document.createElement('a'); a.href=url; a.download='clan_tune.csv'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Clan Boss Tuner</h2>
      <p className="muted">Set a reference champion then compute tuned speeds for your team.</p>
      <div className="card mt-4">
        <TunerTable team={team} champions={champions} setTeam={setTeam} referenceId={refId} setReferenceId={setRefId} onCompute={onCompute} onExport={onExport} />
      </div>
    </div>
  )
}
