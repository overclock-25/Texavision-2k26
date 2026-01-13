import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const baseClasses = cn(
  'inline-flex items-center justify-center gap-2 ',
  'transition-all duration-200 active:scale-95 ',
  'focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none ',
  'disabled:cursor-not-allowed disabled:opacity-50 rounded-lg'
);

const variants = {
  custom: '',
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm [&_svg]:size-3',
  md: 'px-4 py-2 text-base [&_svg]:size-4',
  lg: 'px-6 py-3 text-lg [&_svg]:size-5',
  xl: 'px-8 py-4 text-xl [&_svg]:size-6',
};

/**
 * Flexible button component with link support and icons.
 *
 * @param {Object} props
 * @param {string} [props.href] - URL to navigate to (renders as link)
 * @param {React.ComponentType|'a'} [props.as='a'] - Link component (Next.js Link, React Router, etc.)
 * @param {React.ReactNode} [props.children] - Button content
 * @param {React.ComponentType|React.ReactElement} [props.iconStart] - Icon before text
 * @param {React.ComponentType|React.ReactElement} [props.iconEnd] - Icon after text
 * @param {boolean} [props.disabled=false] - Disables button/link
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button type
 * @param {'custom'|'primary'|'secondary'} [props.variant='custom'] - Visual style
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Size variant
 * @param {Object} [props.classNames] - Override classes for parts (icon)
 * @param {string} [props.className] - Additional button classes
 * @param {string} [props.aria-label] - Required for icon-only buttons
 *
 * @example
 * <Button variant="primary" size="lg">Click me</Button>
 *
 * @example
 * import Link from 'next/link'
 * <Button href="/dashboard" as={Link}>Dashboard</Button>
 *
 * @example
 * <Button iconStart={SaveIcon}>Save</Button>
 */

export const Button = forwardRef(
  (
    {
      href,
      as = 'a',
      children,
      iconStart: IconStart,
      iconEnd: IconEnd,
      disabled = false,
      type = 'button',
      variant = 'custom',
      size = 'md',
      classNames = {},
      className,
      ...props
    },
    ref
  ) => {
    const Comp = href ? as : 'button';
    const isIconOnly = !children && (IconStart || IconEnd);

    const nativeProps = Comp === 'button' ? { type, disabled } : {};
    const linkProps = href && !disabled ? { href } : {};
    const a11yProps =
      Comp !== 'button' && disabled ? { 'aria-disabled': 'true', tabIndex: -1 } : {};

    if (isIconOnly && !props['aria-label']) {
      throw new Error('Icon-only buttons must have an aria-label prop for accessibility.');
    }

    const Icon = (IconProp) => {
      if (!IconProp) return null;
      return (
        <span className={cn('flex shrink-0', classNames?.icon)} aria-hidden="true">
          {typeof IconProp === 'function' ? <IconProp /> : IconProp}
        </span>
      );
    };

    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        style={{
          maskImage: `url(/brush0.svg)`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskImage: `url(/brush0.svg)`,
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
        }}
        {...nativeProps}
        {...linkProps}
        {...a11yProps}
        {...props}
      >
        {IconStart && Icon(IconStart)}
        {children}
        {IconEnd && Icon(IconEnd)}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
