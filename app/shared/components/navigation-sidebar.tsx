import { Link } from 'react-router';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function NavigationSidebar() {
  return (
    <NavigationMenu className="">
      <NavigationMenuList className="">
        <NavigationMenuItem className="">
          <NavigationMenuTrigger
            className="p-2"
            menuIcon={<BurgerMenuIcon className="md:w-10 md:h-10 w-7 h-7" />}
          />
          <NavigationMenuContent className="">
            <ul className="">
              <li>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/" className="text-xl">
                    home
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/about" className="text-xl">
                    about
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/projects" className="text-xl">
                    projects
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/contact" className="text-xl">
                    contact
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const BurgerMenuIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 18L20 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
