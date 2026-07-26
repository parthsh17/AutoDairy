import { type HTMLAttributes } from 'react'
import { Card as AstryxCard } from '@astryxdesign/core/Card'

export function Card({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <AstryxCard {...props}>{children}</AstryxCard>
}
