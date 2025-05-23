import { useEffect, useState } from 'react';
import { useCurrentModule } from '../modules/reports/hooks/useCurrentModule';
import { NAV_ITEMS, NavItem } from '../components/app-side-nav/NavTypes';
import { useAppSelector } from '../_store/hooks';

export function useNavItems() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const currentModule = useCurrentModule();
  const userInfo = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    let items = NAV_ITEMS;
    items = items.map((i) =>
      i.module === currentModule
        ? { ...i, isSelected: true }
        : { ...i, isSelected: false },
    );
    setNavItems(items);
  }, [currentModule, userInfo]);

  function onSelectNavItem(item: NavItem) {
    const items = navItems.map((i) =>
      i === item ? { ...i, isSelected: true } : { ...i, isSelected: false },
    );
    setNavItems(items);
  }

  return [navItems, onSelectNavItem] as const;
}
