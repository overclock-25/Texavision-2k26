import React from 'react';
import Link from 'next/link';

const PrimaryButton = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  href,
  target,
  rel,
}) => {
  const baseClasses = `group relative bg-[url('/images/svg/drip-paint.svg')] bg-cover bg-center bg-no-repeat px-12 py-8 text-xl font-semibold transition duration-300 ease-in-out hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 md:px-14 md:py-9 md:text-2xl ${className}`;

  const innerContent = (
    <div className="text-purple-soft group-disabled:text-purple-soft/70 flex translate-y-[10%] items-center justify-center gap-2 transition-colors duration-150 ease-in-out group-hover:text-white">
      {children ? children : 'Click Me'}
    </div>
  );

  // If href is provided, render as a link
  if (href) {
    const isExternal =
      href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a href={href} target={target} rel={rel} className={baseClasses} onClick={onClick}>
          {innerContent}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
};

export default PrimaryButton;
