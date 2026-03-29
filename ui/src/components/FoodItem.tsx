import { useState } from 'react'
import type { FoodItem as FoodItemType } from '../types/menu'

interface Props {
  item: FoodItemType
  index: number
}

export function FoodItem({ item, index }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="food-item"
      style={{
        animationDelay: `${index * 40}ms`,
        background: hovered ? 'var(--bg-item)' : 'transparent',
        borderColor: hovered ? 'var(--border-hover)' : 'var(--border)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        .food-item {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          gap: 6px 16px;
          padding: 16px 20px;
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: background 0.15s, border-color 0.15s;
          animation: fadeUp 0.4s ease both;
          cursor: default;
        }

        .food-item__name {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 14px;
          color: var(--text-primary);
          letter-spacing: 0.01em;
          grid-column: 1;
          grid-row: 1;
        }

        .food-item__desc {
          font-size: 12px;
          color: var(--text-secondary);
          grid-column: 1;
          grid-row: 2;
          font-weight: 300;
        }

        .food-item__cost {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 500;
          color: var(--accent);
          grid-column: 2;
          grid-row: 1;
          text-align: right;
          white-space: nowrap;
        }

        .food-item__meta {
          grid-column: 2;
          grid-row: 2;
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          align-items: center;
        }

        .food-item__badge {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 2px;
        }

        .food-item__badge--vegan {
          background: rgba(74, 222, 128, 0.1);
          color: var(--vegan);
          border: 1px solid rgba(74, 222, 128, 0.2);
        }

        .food-item__badge--special {
          background: rgba(251, 146, 60, 0.1);
          color: var(--special);
          border: 1px solid rgba(251, 146, 60, 0.2);
        }

        .food-item__code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <span className="food-item__name">{item.name_ru}</span>

      <span className="food-item__cost">
        {parseFloat(item.cost).toLocaleString('ru-RU')} ₽
      </span>

      {item.description_ru && (
        <span className="food-item__desc">{item.description_ru}</span>
      )}

      <div className="food-item__meta">
        {item.is_vegan && <span className="food-item__badge food-item__badge--vegan">vegan</span>}
        {item.is_special && <span className="food-item__badge food-item__badge--special">special</span>}
        <span className="food-item__code">#{item.internal_code}</span>
      </div>
    </div>
  )
}
