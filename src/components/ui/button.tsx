import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // `max-w-full` and `[&>*]:min-w-0` keep a long label inside its container: the
  // button can never grow past its parent, and its content is allowed to shrink
  // so the text wraps instead of running off the side of a phone.
  "inline-flex items-center justify-center gap-2 max-w-full whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>*]:min-w-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary/50 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300",
        "hero-outline": "border-2 border-foreground/30 bg-transparent text-foreground hover:bg-foreground/10 hover:border-foreground/50 font-semibold",
        glow: "bg-primary text-primary-foreground animate-glow-pulse hover:scale-105",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        // The two large sizes start smaller and let their label wrap, then take
        // their full padding and a fixed height from the `sm` breakpoint up. At
        // phone width a call to action like "Get a Free Consultation" is wider
        // than the card holding it, and a fixed height plus nowrap pushed it
        // straight off the screen.
        lg: "min-h-12 rounded-xl px-5 py-2.5 text-sm whitespace-normal sm:h-14 sm:px-10 sm:py-0 sm:text-base sm:whitespace-nowrap",
        xl: "min-h-14 rounded-xl px-6 py-3 text-base whitespace-normal sm:h-16 sm:px-12 sm:py-0 sm:text-lg sm:whitespace-nowrap",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
