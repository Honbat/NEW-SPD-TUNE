import React from 'react'

export default function ChampionDropdown({ champions, value, onChange }) {
  return (
    <select value={value||''} onChange={e=>onChange(e.target.value)} className="p-2 rounded border bg-slate-800/40">
      <option value="">-- select champion --</option>
      {champions.map(c => (
        <option key={c.id} value={c.name}>{c.name} ({c.base_spd})</option>
      ))}
    </select>
  )
}
