import { NavLink } from 'react-router-dom'
import { primaryNavigation } from '@/lib/navigation'

export function BottomNavigation() {
  return (
    <nav className="border-t border-border bg-background/95 shadow-nav backdrop-blur">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-5 gap-1 px-2 py-2 sm:px-6 lg:px-8">
        {primaryNavigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
