import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  customClass?: string;
}

function Card({ customClass, ...props }: Props) {
  return (
    <div {...props} className={`${customClass}`}>
      {props.children}
    </div>
  );
}

export default Card;
