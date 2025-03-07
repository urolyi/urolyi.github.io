import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function LightDarkToggle() {
  const [isDark, setIsDark] = useState(false);

  // Check system preference once after mount
  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
    // Set initial favicon
    const favicon = document.querySelector(
      "link[rel='icon']",
    ) as HTMLLinkElement;
    if (favicon) {
      favicon.href = darkMode ? '/favicon-dark.png' : '/favicon-light.png';
    }
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle('dark', checked);
    // Update favicon
    const favicon = document.querySelector(
      "link[rel='icon']",
    ) as HTMLLinkElement;
    if (favicon) {
      favicon.href = checked ? '/favicon-dark.png' : '/favicon-light.png';
    }
  };

  return (
    <div className="flex items-end justify-end md:gap-2 gap-1 h-full w-full p-2">
      <SunIcon className="fill-background md:h-5 md:w-5 h-3 w-3" />
      <Switch
        id="light-dark-toggle"
        onCheckedChange={toggleDarkMode}
        checked={isDark}
        className=""
      />
      <MoonIcon className="fill-background md:h-5 md:w-5 h-3 w-3" />
    </div>
  );
}
