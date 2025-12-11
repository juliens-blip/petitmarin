import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'gradient'
  children: React.ReactNode
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  const baseStyles = 'bg-white rounded-2xl shadow-card'

  const variants = {
    default: '',
    hover: 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
    gradient: 'bg-gradient-to-br from-white to-gray-50',
  }

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={clsx('p-6 border-b border-gray-100', className)} {...props}>
      {children}
    </div>
  )
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={clsx('p-6', className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={clsx('p-6 border-t border-gray-100', className)} {...props}>
      {children}
    </div>
  )
}
