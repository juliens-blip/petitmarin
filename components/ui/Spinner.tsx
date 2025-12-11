import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'white' | 'gray'
  label?: string
}

export function Spinner({ size = 'md', variant = 'primary', label, className, ...props }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  const variants = {
    primary: 'border-blue border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  }

  return (
    <div
      className={clsx('flex flex-col items-center justify-center gap-3', className)}
      {...props}
    >
      <div
        className={clsx(
          'animate-spin rounded-full border-4',
          sizes[size],
          variants[variant]
        )}
        role="status"
        aria-label={label || 'Chargement'}
      />
      {label && (
        <p className="text-sm font-medium text-gray-600">{label}</p>
      )}
    </div>
  )
}
