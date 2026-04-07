import type { ComponentChildren } from 'preact'

type Variant = 'primary' | 'outline'

interface Props {
  variant?: Variant
  active?: boolean
  disabled?: boolean
  class?: string
  href?: string
  onClick?: () => void
  children: ComponentChildren
}

const base =
  'inline-flex items-center justify-center rounded-lg text-base font-medium border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed py-2'

const variants: Record<Variant, { default: string; active?: string }> = {
  primary: {
    default: 'bg-primary text-primary-fg border-primary',
  },
  outline: {
    default: 'bg-white text-inherit border-border hover:bg-gray-50',
    active: 'bg-primary text-primary-fg border-primary',
  },
}

export function Button({
  variant = 'primary',
  active,
  disabled,
  class: className,
  href,
  onClick,
  children,
}: Props) {
  const v = variants[variant]
  const variantClass = active && v.active ? v.active : v.default
  const cls = `${base} ${variantClass} ${className ?? ''}`

  if (href) {
    return (
      <a href={href} class={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" disabled={disabled} onClick={onClick} class={cls}>
      {children}
    </button>
  )
}
