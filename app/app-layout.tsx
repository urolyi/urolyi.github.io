import { Outlet } from 'react-router';
import NavigationSidebar from './shared/components/navigation-sidebar';
import LightDarkToggle from './shared/components/light-dark-toggle';

export default function AppLayout() {
  return (
    <>
      <header className="fixed top-2 left-2">
        <NavigationSidebar />
      </header>
      <main className="flex h-full w-full justify-center items-center content-center">
        <Outlet />
      </main>
      <footer className="fixed bottom-2 right-2">
        <LightDarkToggle />
      </footer>
    </>
  );
}
