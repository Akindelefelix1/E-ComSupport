export function ViewToggle({ value, onChange, label }) {
  return <div className="segmented-control" role="group" aria-label={label}><button type="button" className={value === 'table' ? 'active' : ''} aria-pressed={value === 'table'} onClick={() => onChange('table')}>Table view</button><button type="button" className={value === 'card' ? 'active' : ''} aria-pressed={value === 'card'} onClick={() => onChange('card')}>Card view</button></div>
}
