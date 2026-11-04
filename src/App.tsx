import { useMemo, useState } from 'react'
import { Activity, Calculator, CircleGauge, Drill, Droplets, Ruler, Search, Waves } from 'lucide-react'
import { annularCapacityBblPerM, pipeCapacityBblPerM, round, steelDisplacementBblPerM, volumeBbl } from './calculations'

type Tab = 'overview' | 'annular' | 'pipe' | 'displacement' | 'units'
const nav: { id: Tab; label: string; icon: typeof Activity }[] = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'annular', label: 'Annular Capacity', icon: Waves },
  { id: 'pipe', label: 'Pipe Capacity', icon: Droplets },
  { id: 'displacement', label: 'Steel Displacement', icon: Drill },
  { id: 'units', label: 'Unit Converter', icon: Ruler },
]
const n = (v: string) => Number(v)

function Field({ label, value, onChange, unit, placeholder = '0' }: { label: string; value: string; onChange: (v: string) => void; unit: string; placeholder?: string }) {
  return <label className="field"><span>{label}</span><div className="input-wrap"><input inputMode="decimal" value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} /><small>{unit}</small></div></label>
}
function Result({ label, value, unit }: { label: string; value: string; unit: string }) {
  return <div className="result"><span>{label}</span><strong>{value}</strong><small>{unit}</small></div>
}
function App() {
  const [tab, setTab] = useState<Tab>('overview')
  const [hole, setHole] = useState('12.25')
  const [od, setOd] = useState('5')
  const [length, setLength] = useState('2500')
  const [id, setId] = useState('4.276')
  const [pipeId, setPipeId] = useState('4.276')
  const [pipeOd, setPipeOd] = useState('5')
  const [search, setSearch] = useState('')
  const [metres, setMetres] = useState('1000')
  const [feet, setFeet] = useState('')

  const annular = useMemo(() => {
    try {
      const c = annularCapacityBblPerM(n(hole), n(od))
      return { cap: c, total: volumeBbl(c, n(length)), error: '' }
    } catch (e) { return { cap: NaN, total: NaN, error: e instanceof Error ? e.message : 'Invalid inputs' } }
  }, [hole, od, length])
  const pipe = useMemo(() => {
    try {
      const c = pipeCapacityBblPerM(n(id))
      return { cap: c, total: volumeBbl(c, n(length)), error: '' }
    } catch (e) { return { cap: NaN, total: NaN, error: 'Check the input values.' } }
  }, [id, length])
  const displacement = useMemo(() => {
    try { return steelDisplacementBblPerM(n(pipeOd), n(pipeId)) }
    catch { return NaN }
  }, [pipeOd, pipeId])

  const filtered = nav.filter(x => x.label.toLowerCase().includes(search.toLowerCase()))
  const title = nav.find(x => x.id === tab)?.label ?? 'Overview'
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><CircleGauge size={23}/></div><div><b>eRedBook</b><small>ENGINEERING TOOLS</small></div></div>
      <div className="nav-search"><Search size={16}/><input placeholder="Find a tool..." value={search} onChange={e => setSearch(e.target.value)}/></div>
      <div className="nav-label">WORKSPACE</div>
      {filtered.map(item => { const Icon = item.icon; return <button key={item.id} className={`nav-item ${tab === item.id ? 'active' : ''}`} onClick={() => setTab(item.id)}><Icon size={18}/>{item.label}</button> })}
      <div className="sidebar-foot"><span className="dot"/> Local engineering workspace</div>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">ENGINEERING REFERENCE / CALCULATORS</span><h1>{title}</h1></div><div className="unit-pill">SI + Oilfield Units</div></header>
      {tab === 'overview' && <section>
        <div className="hero"><div><span className="hero-tag">DRILLING ENGINEERING TOOLKIT</span><h2>Field calculations.<br/><em>Clear and consistent.</em></h2><p>A starter engineering workspace for tubular geometry and wellbore volume calculations.</p><button className="primary" onClick={() => setTab('annular')}>Open calculators <span>→</span></button></div><div className="hero-art"><div className="ring ring1"/><div className="ring ring2"/><div className="hero-icon"><Drill size={54}/></div><span className="art-label">WELLBORE<br/>GEOMETRY</span></div></div>
        <div className="section-heading"><div><span className="eyebrow">AVAILABLE MODULES</span><h2>Calculation tools</h2></div><span className="muted">Starter build · v1.0</span></div>
        <div className="cards">
          <button className="module-card" onClick={() => setTab('annular')}><div className="module-icon blue"><Waves/></div><b>Annular Capacity</b><p>Hole and pipe geometry to calculate annular capacity and total volume.</p><span>OPEN TOOL ↗</span></button>
          <button className="module-card" onClick={() => setTab('pipe')}><div className="module-icon cyan"><Droplets/></div><b>Pipe Capacity</b><p>Internal capacity from pipe inside diameter and measured length.</p><span>OPEN TOOL ↗</span></button>
          <button className="module-card" onClick={() => setTab('displacement')}><div className="module-icon orange"><Drill/></div><b>Steel Displacement</b><p>Displaced volume based on tubular OD, ID and length.</p><span>OPEN TOOL ↗</span></button>
        </div>
        <div className="notice"><Activity size={19}/><div><b>Engineering note</b><p>This initial build calculates geometric volumes only. API ratings, burst/collapse, tensile, connection strength and cement design require verified product data and applicable standards before operational use.</p></div></div>
      </section>}
      {tab === 'annular' && <section className="tool-layout"><div className="panel"><div className="panel-title"><div className="module-icon blue"><Waves/></div><div><h2>Annular Capacity</h2><p>Calculate annular capacity between hole and tubular.</p></div></div><div className="form-grid"><Field label="Hole diameter" value={hole} onChange={setHole} unit="in" /><Field label="Pipe / casing OD" value={od} onChange={setOd} unit="in" /><Field label="Annular length" value={length} onChange={setLength} unit="m" /></div>{annular.error && <p className="error">{annular.error}</p>}<p className="formula">Formula: π ÷ 4 × (Hole ID² − Pipe OD²) × 0.0254² × 6.28981077</p></div><div className="output-panel"><span className="eyebrow">CALCULATED RESULTS</span><Result label="Annular capacity" value={round(annular.cap)} unit="bbl/m"/><Result label="Total annular volume" value={round(annular.total)} unit="bbl"/><Result label="Total volume" value={round(annular.total * 158.9873)} unit="litres"/></div></section>}
      {tab === 'pipe' && <section className="tool-layout"><div className="panel"><div className="panel-title"><div className="module-icon cyan"><Droplets/></div><div><h2>Pipe Capacity</h2><p>Calculate internal volume of a tubular.</p></div></div><div className="form-grid"><Field label="Pipe inside diameter" value={id} onChange={setId} unit="in"/><Field label="Pipe length" value={length} onChange={setLength} unit="m"/></div><p className="formula">Formula: π ÷ 4 × ID² × length</p></div><div className="output-panel"><span className="eyebrow">CALCULATED RESULTS</span><Result label="Internal capacity" value={round(pipe.cap)} unit="bbl/m"/><Result label="Total internal volume" value={round(pipe.total)} unit="bbl"/><Result label="Total volume" value={round(pipe.total * 158.9873)} unit="litres"/>{pipe.error && <p className="error">{pipe.error}</p>}</div></section>}
      {tab === 'displacement' && <section className="tool-layout"><div className="panel"><div className="panel-title"><div className="module-icon orange"><Drill/></div><div><h2>Steel Displacement</h2><p>Calculate steel body displacement per unit length.</p></div></div><div className="form-grid"><Field label="Pipe outside diameter" value={pipeOd} onChange={setPipeOd} unit="in"/><Field label="Pipe inside diameter" value={pipeId} onChange={setPipeId} unit="in"/></div><p className="formula">Formula: π ÷ 4 × (OD² − ID²) × conversion factors</p></div><div className="output-panel"><span className="eyebrow">CALCULATED RESULTS</span><Result label="Steel displacement" value={round(displacement)} unit="bbl/m"/><Result label="Steel displacement" value={round(displacement * 158.9873)} unit="litres/m"/></div></section>}
      {tab === 'units' && <section className="tool-layout"><div className="panel"><div className="panel-title"><div className="module-icon blue"><Ruler/></div><div><h2>Length Converter</h2><p>Convert metres and feet.</p></div></div><div className="form-grid"><Field label="Metres" value={metres} onChange={v => {setMetres(v); setFeet(v === '' ? '' : String(n(v) * 3.280839895))}} unit="m"/><Field label="Feet" value={feet} onChange={v => {setFeet(v); setMetres(v === '' ? '' : String(n(v) / 3.280839895))}} unit="ft"/></div><div className="conversion-result"><b>{metres === '' ? '—' : round(n(metres) * 3.280839895, 3)} ft</b><span>1 metre = 3.280839895 feet</span></div></div><div className="output-panel"><span className="eyebrow">QUICK REFERENCES</span><Result label="1 inch" value="25.4" unit="mm"/><Result label="1 bbl (US)" value="158.9873" unit="litres"/><Result label="1 m³" value="6.28981" unit="bbl"/></div></section>}
      <footer>eRedBook Engineering · Independent engineering utility · Verify inputs and calculations before field use.</footer>
    </main>
  </div>
}
export default App