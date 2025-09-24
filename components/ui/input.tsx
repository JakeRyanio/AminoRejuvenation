import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "safari-autofill-fix",
          "force-safari-styling",
          "safari-destroyer",
          className
        )}
        ref={ref}
        style={{
          backgroundColor: '#E1EDEC',
          color: '#3A423B',
          WebkitBoxShadow: '0 0 0 1000px #E1EDEC inset',
          WebkitTextFillColor: '#3A423B',
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
