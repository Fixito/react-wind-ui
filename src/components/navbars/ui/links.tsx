import { classNames } from '@/lib/utils.ts';

import type { NavigationItem } from '../data.ts';

interface NavbarLinksProps {
  navigation: NavigationItem[];
}

export function NavbarLinks({ navigation }: NavbarLinksProps) {
  return (
    <div className="flex gap-x-4">
      {navigation.map((item) => (
        <NavbarLink key={item.name} item={item} />
      ))}
    </div>
  );
}

function NavbarLink({ item }: { item: NavigationItem }) {
  return (
    <a
      key={item.name}
      href={item.href}
      aria-current={item.current ? 'page' : undefined}
      className={classNames(
        item.current
          ? 'bg-navbar-primary text-navbar-primary-foreground'
          : 'text-navbar-foreground hover:bg-navbar-accent hover:text-navbar-accent-foreground',
        'rounded-md px-3 py-2 text-sm font-medium',
      )}
    >
      {item.name}
    </a>
  );
}
