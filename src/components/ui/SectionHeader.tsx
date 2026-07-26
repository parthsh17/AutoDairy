import { type ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  headingLevel?: 1 | 2
}

export function SectionHeader({ title, description, action, headingLevel = 2 }: SectionHeaderProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <Heading className="text-lg font-semibold">{title}</Heading>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
