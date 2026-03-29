import { useEffect, useState } from 'react'
import type { FoodCategory } from './types/menu'
import { fetchMenu } from './api/menu'
import { CategoryCard } from './components/CategoryCard'
import './styles/global.css'

type Status = 'loading' | 'success' | 'error'

export function App() {
  const [categories, setCategories] = useState<FoodCategory[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchMenu()
      .then(data => {
        setCategories(data)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  const filtered = categories
    .map(cat => ({
      ...cat,
      foods: cat.foods.filter(f =>
        f.name_ru.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(cat => cat.foods.length > 0)

  return (
    <>
      <style>{`
        .layout {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }

        .header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 48px 0 40px;
          border-bottom: 1px solid var(--border);
          gap: 32px;
          flex-wrap: wrap;
        }

        .header__brand {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .header__logo {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .header__title {
          font-family: var(--font-display);
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1;
        }

        .header__subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 300;
          margin-top: 8px;
        }

        .search-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .search {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 10px 16px 10px 40px;
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--text-primary);
          width: 240px;
          outline: none;
          transition: border-color 0.15s;
        }

        .search::placeholder {
          color: var(--text-muted);
        }

        .search:focus {
          border-color: var(--accent-border);
          background: rgba(232, 255, 71, 0.02);
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 14px;
          pointer-events: none;
        }

        .stats {
          display: flex;
          gap: 24px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat__value {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .stat__label {
          font-size: 11px;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .stat-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
        }

        .categories {
          display: flex;
          flex-direction: column;
        }

        .state-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 320px;
          gap: 16px;
        }

        .state-screen__icon {
          font-size: 32px;
          opacity: 0.3;
        }

        .state-screen__text {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .loader {
          display: flex;
          gap: 6px;
        }

        .loader__dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 1.2s ease-in-out infinite;
        }

        .loader__dot:nth-child(2) { animation-delay: 0.2s; }
        .loader__dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1); }
        }

        .footer {
          margin-top: 80px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer__brand {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer__api {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }
      `}</style>

      <div className="layout">
        <header className="header">
          <div className="header__brand">
            <span className="header__logo">UTF.tech</span>
            <h1 className="header__title">Меню</h1>
            <p className="header__subtitle">Актуальное меню ресторана</p>
          </div>

          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search"
              type="text"
              placeholder="Поиск блюда..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </header>

        {status === 'success' && (
          <div className="stats">
            <div className="stat">
              <span className="stat__value">{categories.length}</span>
              <span className="stat__label">Категорий</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__value">
                {categories.reduce((acc, c) => acc + c.foods.length, 0)}
              </span>
              <span className="stat__label">Блюд</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__value">
                {categories.reduce((acc, c) => acc + c.foods.filter(f => f.is_vegan).length, 0)}
              </span>
              <span className="stat__label">Вегет.</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__value">
                {categories.reduce((acc, c) => acc + c.foods.filter(f => f.is_special).length, 0)}
              </span>
              <span className="stat__label">Special</span>
            </div>
          </div>
        )}

        <main className="categories">
          {status === 'loading' && (
            <div className="state-screen">
              <div className="loader">
                <div className="loader__dot" />
                <div className="loader__dot" />
                <div className="loader__dot" />
              </div>
              <span className="state-screen__text">загрузка меню...</span>
            </div>
          )}

          {status === 'error' && (
            <div className="state-screen">
              <span className="state-screen__icon">⚠</span>
              <span className="state-screen__text">не удалось загрузить меню</span>
            </div>
          )}

          {status === 'success' && filtered.length === 0 && (
            <div className="state-screen">
              <span className="state-screen__icon">∅</span>
              <span className="state-screen__text">блюда не найдены</span>
            </div>
          )}

          {status === 'success' &&
            filtered.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
        </main>

        <footer className="footer">
          <span className="footer__brand">UTF.tech — 2026</span>
          <span className="footer__api">GET /api/v1/foods/</span>
        </footer>
      </div>
    </>
  )
}
