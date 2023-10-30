import { cn } from '../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes,AnchorHTMLAttributes, FC } from 'react'

export const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-full font-medium transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all ease-in-out duration-300',
  {
    variants: {
      variant: {
        default: 'bg-primary text-secondary font-bold hover:bg-secondary hover:text-primary hover:border-tertiary hover:border-2 cursor-pointer',
        dark: 'bg-secondary text-primary font-bold hover:bg-tertiary hover:text-secondary hover:border-primary hover:border-2 cursor-pointer',
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200',
        disabled: "bg-secondary opacity-50 text-white",
      },
      size: {
        default: 'h-10 py-2 px-4 text-sm',
        sm: 'h-9 px-3 py-1 text-xs',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}>
      {isLoading ? <Loader2 className='mr-2 text-primary h-4 w-4 animate-spin' /> : null}
      {children}
    </button>
  )
}

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
}

export const Link: FC<LinkProps> = ({
  className,
  children,
  variant,
  size,
  ...props
}) => {
  return (
    <a
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}>
      {children}
    </a>
  )
}


