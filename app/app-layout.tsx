import { Outlet } from 'react-router';
import NavigationSidebar from './shared/components/navigation-sidebar';
import LightDarkToggle from './shared/components/light-dark-toggle';

export default function AppLayout() {
  return (
    <div className="h-screen w-screen">
      <aside className="fixed top-2 left-2 w-1/2">
        <NavigationSidebar />
      </aside>
      <main className="flex h-screen justify-center items-center">
        <Outlet />
      </main>
      <aside className="fixed bottom-2 right-2 p-3">
        <LightDarkToggle />
      </aside>
    </div>
  );
}
