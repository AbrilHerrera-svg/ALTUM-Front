// ============================================================
// ShopView.tsx — TIENDA DE ACCESORIOS
// El alumno gasta las estrellas que ganó jugando para comprar
// accesorios que visten a su avatar (lentes, capas, cascos, etc.)
// ============================================================

import { SHOP_ITEMS } from '../data/shop';
import type { ShopData } from '../types';
import './ShopView.css';

interface Props {
  avatar:        string;    // emoji del personaje actual del alumno
  totalStars:    number;    // estrellas totales ganadas jugando
  shopData:      ShopData;  // qué compró y qué tiene puesto
  onBuy:         (itemId: string, price: number) => void;
  onEquip:       (itemId: string | null) => void;
  onBack:        () => void;
}

export default function VistaTienda({ avatar, totalStars, shopData, onBuy, onEquip, onBack }: Props) {

  // Estrellas disponibles = todas las ganadas menos las que ya se gastaron
  const disponibles = totalStars - shopData.spentStars;

  return (
    <div className="sv-backdrop">

      {/* ── Encabezado ── */}
      <div className="sv-header">
        <button className="sv-back" onClick={onBack}>← Perfil</button>
        <span className="sv-header-title">🛍️ Tienda Espacial</span>
        <div className="sv-balance">⭐ {disponibles}</div>
      </div>

      <div className="sv-content">

        {/* ── Vista previa del avatar con el accesorio puesto ── */}
        <div className="sv-preview">
          <div className="sv-preview-avatar">
            <span>{avatar}</span>
            {/* Si hay un accesorio equipado, se muestra como insignia sobre el avatar */}
            {shopData.equipped && (
              <span className="sv-preview-badge">
                {SHOP_ITEMS.find(i => i.id === shopData.equipped)?.emoji}
              </span>
            )}
          </div>
          <p className="sv-preview-label">Así se ve tu explorador</p>
          {/* Botón para quitarse el accesorio puesto */}
          {shopData.equipped && (
            <button className="sv-unequip-btn" onClick={() => onEquip(null)}>Quitar accesorio</button>
          )}
        </div>

        {/* ── Catálogo de accesorios ── */}
        <div className="sv-grid">
          {SHOP_ITEMS.map(item => {
            const owned    = shopData.ownedItems.includes(item.id);
            const equipped = shopData.equipped === item.id;
            const puedeComprar = disponibles >= item.price;

            return (
              <div key={item.id} className={`sv-card ${equipped ? 'sv-card--equipped' : ''}`}>
                <div className="sv-card-emoji">{item.emoji}</div>
                <p className="sv-card-name">{item.name}</p>

                {/* TERNARIO: si ya lo tiene, muestra botón de "usar/puesto"; si no, botón de comprar */}
                {owned ? (
                  <button
                    className={`sv-card-btn ${equipped ? 'sv-card-btn--equipped' : 'sv-card-btn--use'}`}
                    onClick={() => onEquip(equipped ? null : item.id)}
                  >
                    {equipped ? '✔ Puesto' : 'Usar'}
                  </button>
                ) : (
                  <button
                    className="sv-card-btn sv-card-btn--buy"
                    disabled={!puedeComprar}
                    onClick={() => onBuy(item.id, item.price)}
                  >
                    ⭐ {item.price}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
