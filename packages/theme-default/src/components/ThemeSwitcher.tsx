import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const themes = [
  { id: 'default', name: 'Default', description: 'Modern documentation theme', icon: '🎨' },
  { id: 'blog', name: 'Blog', description: 'Article-focused theme', icon: '📝' },
  { id: 'business', name: 'Business', description: 'Professional corporate theme', icon: '💼' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and minimal theme', icon: '🎯' }
];

export function ThemeSwitcher(): h.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [currentThemeId, setCurrentThemeId] = useState('default');

  useEffect(() => {
    const stored = localStorage.getItem('leaf-theme');
    if (stored) {
      setCurrentThemeId(stored);
    }
  }, []);

  const currentTheme = themes.find(t => t.id === currentThemeId) || themes[0];

  const handleThemeChange = (themeId: string) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('leaf-theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Switch theme"
      >
        <span className="text-lg">{currentTheme.icon}</span>
        <span className="hidden md:inline">{currentTheme.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Choose Theme</h3>
            <div className="space-y-2">
              {themes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentThemeId === theme.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{theme.icon}</span>
                    <div>
                      <div className="font-medium">{theme.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{theme.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}