import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-primary-active rounded-md disabled:bg-primary-disabled disabled:text-ink/40",
    secondary: "bg-canvas text-ink border border-hairline hover:bg-surface-soft rounded-md",
    "secondary-on-dark": "bg-surface-dark-elevated text-on-dark hover:bg-surface-dark-soft rounded-md",
    "text-link": "bg-transparent text-primary hover:underline underline-offset-4",
    "icon-circular": "bg-canvas border border-hairline text-ink rounded-full hover:bg-surface-soft",
  };

  const sizes = {
    default: "h-10 px-[20px] py-[12px] text-[14px]",
    sm: "h-8 px-3 text-[13px] rounded-sm",
    icon: "h-[36px] w-[36px]",
    link: "h-auto px-0 py-0 text-[14px]",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[variant === 'icon-circular' ? 'icon' : variant === 'text-link' ? 'link' : size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
