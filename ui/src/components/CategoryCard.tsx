import { useState } from 'react'
import type { FoodCategory } from '../types/menu'
import { FoodItem } from './FoodItem'

interface Props {
  category: FoodCategory
  index: number
}

export function CategoryCard({ category, index }: Props) {
  const [open, setOpen] = useState(true)

  return (
    <section
      className="category"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <style>{`
        .category {
          animation: fadeUp 0.5s ease both;
        }

        .category__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0 16px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          user-select: none;
        }

        .category__header:hover .category__title {
          color: var(--accent);
        }

        .category__left {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .category__order {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .category__title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          transition: color 0.15s;
        }

        .category__count {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          background: var(--bg-item);
          border: 1px solid var(--border);
          padding: 2px 8px;
          border-radius: 2px;
        }

        .category__toggle {
          font-family: var(--font-mono);
          font-size: 18px;
          color: var(--text-muted);
          transition: transform 0.2s, color 0.15s;
        }

        .category__toggle--open {
          transform: rotate(180deg);
          color: var(--accent);
        }

        .category__body {
          display: grid;
          grid-template-rows: 1fr;
          overflow: hidden;
          transition: grid-template-rows 0.25s ease;
        }

        .category__body--closed {
          grid-template-rows: 0fr;
        }

        .category__inner {
          min-height: 0;
        }

        .category__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 8px;
          padding: 16px 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="category__header"
        onClick={() => setOpen(o => !o)}
        role="button"
        aria-expanded={open}
      >
        <div className="category__left">
          <span className="category__order">{String(category.order_id).padStart(2, '0')}</span>
          <h2 className="category__title">{category.name_ru}</h2>
          <span className="category__count">{category.foods.length}</span>
        </div>
        <span className={`category__toggle ${open ? 'category__toggle--open' : ''}`}>↑</span>
      </div>

      <div className={`category__body ${open ? '' : 'category__body--closed'}`}>
        <div className="category__inner">
          <div className="category__grid">
            {category.foods.map((food, i) => (
              <FoodItem key={food.internal_code} item={food} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
