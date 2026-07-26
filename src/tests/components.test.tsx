import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { SearchBar } from '@/components/ui/SearchBar'
import { Toast } from '@/components/ui/Toast'

describe('shared components', () => {
  it('renders button text', () => {
    render(<Button>Save</Button>)
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('renders a search bar label', () => {
    render(<SearchBar label="Search" value="" onChange={() => undefined} />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('renders toast content', () => {
    render(<Toast title="Done" message="Saved" />)
    expect(screen.getByText('Saved')).toBeInTheDocument()
  })
})
