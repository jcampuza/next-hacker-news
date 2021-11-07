import { cn } from '@lib/cn';
import { FC } from 'react';

export const Container: FC<{ className?: string }> = (props) => {
  return <div className={cn('max-w-2xl mx-auto p-2', props.className)}>{props.children}</div>;
};
