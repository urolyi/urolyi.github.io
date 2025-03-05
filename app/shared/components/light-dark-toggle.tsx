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
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle('dark', checked);
  };

  return (
    <div className="flex items-center gap-2">
      <SunIcon className="fill-background" />
      <Switch
        id="light-dark-toggle"
        onCheckedChange={toggleDarkMode}
        checked={isDark}
      />
      <MoonIcon className="fill-background" />
    </div>
  );
}
