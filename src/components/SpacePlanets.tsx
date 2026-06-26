import './SpacePlanets.css';

interface Props {
  /** Qué planetas mostrar. Por defecto muestra todos. */
  show?: ('saturn' | 'moon' | 'mars' | 'uranus')[];
}

const ALL = ['saturn', 'moon', 'mars', 'uranus'] as const;

export default function SpacePlanets({ show = [...ALL] }: Props) {
  const has = (p: typeof ALL[number]) => show.includes(p);

  return (
    <>
      {has('saturn') && (
        <div className="sp-saturn">
          <div className="sp-saturn-body" />
          <div className="sp-saturn-ring" />
        </div>
      )}

      {has('moon') && (
        <div className="sp-moon">
          <div className="sp-crater" style={{ top: '22%', left: '18%', width: 13, height: 13 }} />
          <div className="sp-crater" style={{ top: '48%', left: '52%', width: 19, height: 19 }} />
          <div className="sp-crater" style={{ top: '68%', left: '22%', width: 9,  height: 9  }} />
          <div className="sp-crater" style={{ top: '30%', left: '65%', width: 11, height: 11 }} />
        </div>
      )}

      {has('mars') && <div className="sp-mars" />}

      {has('uranus') && <div className="sp-uranus" />}
    </>
  );
}
