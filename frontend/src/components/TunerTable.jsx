import React from 'react'

export default function TunerTable({ team, champions, setTeam, referenceId, setReferenceId, onCompute, onExport }) {
  function updateRow(i, patch){ const next = team.slice(); next[i] = {...next[i], ...patch}; setTeam(next) }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Champion</th><th>Base</th><th>Offset</th><th>Effective</th><th>Ratio</th><th>Boss</th><th>Primary CD</th><th>Target</th><th></th>
          </tr>
        </thead>
        <tbody>
          {team.map((r,i) => {
            const effective = (r.base_spd||0) + (Number(r.offset)||0)
            return (
              <tr key={i} className={r.id===referenceId ? 'highlight-ref' : ''}>
                <td>{i+1}</td>
                <td>
                  <select value={r.name||''} onChange={e=>{
                    const sel = champions.find(c=>c.name===e.target.value)
                    updateRow(i, { name: sel ? sel.name : '', id: sel ? sel.id : null, base_spd: sel ? sel.base_spd : null })
                  }}>
                    <option value="">--</option>
                    {champions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </td>
                <td>{r.base_spd||''}</td>
                <td><input type="number" value={r.offset||0} onChange={e=>updateRow(i,{offset: Number(e.target.value)})} className="p-1 w-20" /></td>
                <td>{effective}</td>
                <td><input value={r.tune_ratio||'4:3'} onChange={e=>updateRow(i,{tune_ratio:e.target.value})} className="p-1 w-24" /></td>
                <td>
                  <select value={r.boss_type||'Clan Boss'} onChange={e=>updateRow(i,{boss_type:e.target.value})}>
                    <option>Clan Boss</option><option>Hydra</option><option>Chimera</option>
                  </select>
                </td>
                <td><input type="number" value={r.primary_cd||4} onChange={e=>updateRow(i,{primary_cd: Number(e.target.value)})} className="p-1 w-16" /></td>
                <td>{r.tuned ?? ''}</td>
                <td><button className="btn" onClick={()=>setReferenceId(r.id||null)}>Set Ref</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="mt-3 flex gap-3">
        <button className="btn" onClick={onCompute}>Compute Tuned</button>
        <button className="btn" onClick={onExport}>Export CSV</button>
      </div>
    </div>
  )
}
