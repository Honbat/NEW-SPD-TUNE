export function parseRatio(r) {
  if (!r) return 1;
  if (typeof r === 'number') return r;
  const parts = String(r).split(':');
  if (parts.length === 2) {
    const a = Number(parts[0]), b = Number(parts[1]);
    if (!isNaN(a) && !isNaN(b) && b !== 0) return a / b;
  }
  const v = Number(r);
  return isNaN(v) ? 1 : v;
}

export function computeDWJTunedTeam(team, referenceId, referenceTargets, options = {}) {
  const { applyCooldownAlignment = true, rounding = 'nearest', tieAvoidance = true } = options;
  const ref = team.find(t => t.id === referenceId);
  if (!ref) throw new Error("Reference champion not found");

  let computed = team.map(t => {
    const ratio = parseRatio(t.tune_ratio || '4:3');
    const bossType = t.boss_type || 'Clan Boss';
    const refVal = bossType === 'Hydra' ? referenceTargets.hydra : bossType === 'Chimera' ? referenceTargets.chimera : referenceTargets.clan;
    let tuned = refVal * ratio;

    const offsetTurns = Number(t.offset_turns || 0);
    if (offsetTurns) tuned += -offsetTurns * 6;

    if (applyCooldownAlignment && t.primary_cd && ref.primary_cd) {
      const cdRatio = Number(t.primary_cd) / Number(ref.primary_cd);
      tuned *= Math.pow(1 / cdRatio, 0.02);
    }

    tuned += Number(t.spd_offset || 0);

    let final = rounding === 'floor' ? Math.floor(tuned) : rounding === 'ceil' ? Math.ceil(tuned) : Math.round(tuned);

    return { ...t, tuned_raw: tuned, tuned: final };
  });

  if (tieAvoidance) {
    const map = {};
    computed.forEach(c => {
      map[c.tuned] = map[c.tuned] || [];
      map[c.tuned].push(c.id);
    });
    Object.values(map).forEach(ids => {
      if (ids.length > 1) {
        ids.forEach((id, idx) => {
          const i = computed.findIndex(x => x.id === id);
          computed[i].tuned += idx;
        });
      }
    });
  }
  return computed;
}
