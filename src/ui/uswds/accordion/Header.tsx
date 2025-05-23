export interface HeaderProps {
  children: React.ReactNode;
  isExpand?: boolean;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default Header;
