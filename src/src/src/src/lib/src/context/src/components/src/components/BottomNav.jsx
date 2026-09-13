import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'الرئيسية', icon: '⌂' },
  { to: '/discover', label: 'استكشاف', icon: '⌕' },
  { to: '/upload', label: 'إضافة', icon: '+' },
  { to: '/notifications', label: 'الإشعارات', icon: '♡' },
  { to: '/profile', label: 'حسابي', icon: '☺' }
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
        >
          <span className="icon-dot">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
