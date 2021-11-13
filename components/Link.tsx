import { cn } from '@lib/cn';
import NextLink, { LinkProps } from 'next/link';
import { FC } from 'react';

export const Link: FC<LinkProps & { className?: string }> = ({ className, children, ...rest }) => {
  return (
    <NextLink {...rest}>
      <a className={cn('hover:underline focus:underline inline-block', className)}>{children}</a>
    </NextLink>
  );
};

export const LinkButton: FC<LinkProps & { className?: string }> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <NextLink {...rest}>
      <a
        className={cn(
          'focus:outline-none focus:ring-2 focus:ring-offset-2 ring-gray-900 bg-gray-900 focus:bg-gray-700 hover:bg-gray-700 rounded-md transition-colors duration-200 text-white px-4 py-2 inline-block',
          className
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};
