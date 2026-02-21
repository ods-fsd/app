'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ThemeSync() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      // Безпечна перевірка роуту
      const isAuth = pathname?.startsWith('/auth') ?? false;
      const savedTheme = localStorage.getItem('theme');
      
      // Перевіряємо системні налаштування користувача
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      
      // Визначаємо дефолтну світлу тему залежно від сторінки (auth чи main)
      const defaultLight = isAuth ? 'color-scheme-1' : 'color-scheme-2';
      
      // Пріоритет: 1. Збережена тема -> 2. Системна темна -> 3. Дефолтна для роуту
      const theme =
        savedTheme || (prefersDark ? 'color-scheme-3' : defaultLight);
        
      document.documentElement.dataset.theme = theme;
    } catch (e) {
      console.error('ThemeSync failed:', e);
    }
  }, [pathname]);

  return null;
}