/* eslint-disable react/display-name */
import { Children, PropsWithChildren } from 'react';

const Show = (props: any) => {
  let when: any = null;
  let otherwise: any = null;

  Children.forEach(props.children, (children) => {
    if (children.props.condition === undefined) {
      otherwise = children;
    } else if (!when && children.props.condition === true) {
      when = children;
    }
  });

  return when || otherwise;
};

Show.When = ({
  condition,
  children,
}: { condition: boolean } & PropsWithChildren<any>) =>
  condition ? children : null;
Show.Else = ({ render, children }: any) => render || children || null;

export default Show;
