
import './ProgressBar.css';

interface Props {
  current: number;
  total: number;
  color?: string;
}

export default function BarraProgreso({ current, total, color = '#7c3aed' }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="pbar-wrap">
      <div className="pbar-track">
        <div className="pbar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="pbar-label">{current}/{total}</span>
    </div>
  );
}
