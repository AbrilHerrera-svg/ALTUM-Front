
import './GameHeader.css';

interface Props {
  title: string;
  subtitle?: string;
  lives?: number;
  totalLives?: number;
  onBack: () => void;
}

export default function CabeceraJuego({ title, subtitle, lives, totalLives = 3, onBack }: Props) {
  return (
    <div className="gh-wrap">
      <button className="gh-back" onClick={onBack} aria-label="Volver">←</button>
      <div className="gh-center">
        <span className="gh-title">{title}</span>
        {subtitle && <span className="gh-sub">{subtitle}</span>}
      </div>
      {lives !== undefined && (
        <div className="gh-lives">
          {Array.from({ length: totalLives }, (_, i) => (
            <span key={i} className={`gh-heart ${i < lives ? 'alive' : 'lost'}`}>
              {i < lives ? '❤️' : '🖤'}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
