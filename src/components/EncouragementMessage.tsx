import { useEffect, useState } from 'react';
import type { EncouragementType } from '../types';
// @ts-ignore: CSS import module type declarations are not available in this project setup.
import './EncouragementMessage.css';

interface Props {
  message: string;
  type: EncouragementType;
  onDone: () => void;
}

export default function MensajeAnimo({ message, type, onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`enc-overlay ${visible ? 'show' : 'hide'}`}>
      <div className={`enc-bubble enc-bubble--${type}`}>
        <span className="enc-icon">{type === 'wrong' ? '😬' : '🎉'}</span>
        <p className="enc-text">{message}</p>
      </div>
    </div>
  );
}
