// ============================================================
// ConfirmModal.tsx — Modal de confirmación/alerta reutilizable,
// con el mismo estilo morado pastel del resto de ALTUM. Reemplaza
// a los confirm()/alert() nativos del navegador (los feos grises).
//
// Dos modos:
//   - Alerta:     solo pasas `message` (y opcional `title`) → 1 botón
//   - Confirmar:  pasas también `onCancel` → 2 botones (Aceptar/Cancelar)
// ============================================================

interface Props {
  open:         boolean;
  title?:       string;
  message:      string;
  confirmText?: string;
  cancelText?:  string;
  danger?:      boolean;   // true = botón de confirmar en rojo (para borrar algo)
  onConfirm:    () => void;
  onCancel?:    () => void; // si no se pasa, es una alerta de un solo botón
}

export default function ConfirmModal({
  open, title, message, confirmText = 'Aceptar', cancelText, danger = false, onConfirm, onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="cm-overlay" onClick={onCancel ?? onConfirm}>
      <div className="cm-box" onClick={e => e.stopPropagation()}>
        {title && <h3 className="cm-title">{title}</h3>}
        <p className="cm-message">{message}</p>
        <div className="cm-actions">
          {onCancel && (
            <button className="cm-btn cm-btn-cancel" onClick={onCancel}>
              {cancelText || 'Cancelar'}
            </button>
          )}
          <button className={`cm-btn ${danger ? 'cm-btn-danger' : 'cm-btn-confirm'}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
