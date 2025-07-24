import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ThemeConfig } from '../types';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  availableThemes: ThemeConfig[];
  availableFonts: FontCollection[];
  updateTheme: (themeId: string) => void;
  updateFonts: (fontCollectionId: string) => void;
  applyCustomColors: (colors: Partial<ThemeConfig['colors']>) => void;
  getCSSVariables: () => Record<string, string>;
}

interface FontCollection {
  id: string;
  name: string;
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  description: string;
}

// Expanded Color Collections with more themes
const colorCollections: ThemeConfig[] = [
  {
    id: 'modern-blue',
    name: 'Ocean Breeze',
    colors: {
      primary: '#0ea5e9',
      secondary: '#71717a',
      accent: '#d946ef',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#18181b',
      textSecondary: '#71717a',
      border: '#e4e4e7',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f0f9ff',
      primary200: '#e0f2fe',
      primary300: '#bae6fd',
      secondary100: '#fafafa',
      secondary200: '#f4f4f5',
      accent100: '#fdf4ff',
      accent200: '#fae8ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
      md: '0 4px 16px rgba(0, 0, 0, 0.08)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
      xl: '0 16px 64px rgba(0, 0, 0, 0.16)',
    },
  },
  {
    id: 'dark-mode',
    name: 'Midnight Dark',
    colors: {
      primary: '#0ea5e9',
      secondary: '#ffffff',
      accent: '#d946ef',
      background: '#18181b',
      surface: '#27272a',
      text: '#ffffff',
      textSecondary: '#a1a1aa',
      border: '#3f3f46',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f0f9ff',
      primary200: '#e0f2fe',
      primary300: '#bae6fd',
      secondary100: '#fafafa',
      secondary200: '#f4f4f5',
      accent100: '#fdf4ff',
      accent200: '#fae8ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
      md: '0 4px 16px rgba(0, 0, 0, 0.3)',
      lg: '0 8px 32px rgba(0, 0, 0, 0.3)',
      xl: '0 16px 64px rgba(0, 0, 0, 0.3)',
    },
  },
  {
    id: 'vibrant-gradient',
    name: 'Purple Passion',
    colors: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f3e8ff',
      primary200: '#e9d5ff',
      primary300: '#d8b4fe',
      secondary100: '#ecfeff',
      secondary200: '#cffafe',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(139, 92, 246, 0.1)',
      md: '0 4px 16px rgba(139, 92, 246, 0.15)',
      lg: '0 8px 32px rgba(139, 92, 246, 0.2)',
      xl: '0 16px 64px rgba(139, 92, 246, 0.25)',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#ecfdf5',
      primary200: '#d1fae5',
      primary300: '#a7f3d0',
      secondary100: '#f0fdfa',
      secondary200: '#ccfbf1',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(5, 150, 105, 0.1)',
      md: '0 4px 16px rgba(5, 150, 105, 0.15)',
      lg: '0 8px 32px rgba(5, 150, 105, 0.2)',
      xl: '0 16px 64px rgba(5, 150, 105, 0.25)',
    },
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    colors: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#7c3aed',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fff7ed',
      primary200: '#ffedd5',
      primary300: '#fed7aa',
      secondary100: '#fef2f2',
      secondary200: '#fecaca',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(234, 88, 12, 0.1)',
      md: '0 4px 16px rgba(234, 88, 12, 0.15)',
      lg: '0 8px 32px rgba(234, 88, 12, 0.2)',
      xl: '0 16px 64px rgba(234, 88, 12, 0.25)',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    colors: {
      primary: '#e11d48',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fff1f2',
      primary200: '#ffe4e6',
      primary300: '#fecdd3',
      secondary100: '#fdf2f8',
      secondary200: '#fce7f3',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(225, 29, 72, 0.1)',
      md: '0 4px 16px rgba(225, 29, 72, 0.15)',
      lg: '0 8px 32px rgba(225, 29, 72, 0.2)',
      xl: '0 16px 64px rgba(225, 29, 72, 0.25)',
    },
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    colors: {
      primary: '#1d4ed8',
      secondary: '#3730a3',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#dbeafe',
      primary200: '#bfdbfe',
      primary300: '#93c5fd',
      secondary100: '#e0e7ff',
      secondary200: '#c7d2fe',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(29, 78, 216, 0.1)',
      md: '0 4px 16px rgba(29, 78, 216, 0.15)',
      lg: '0 8px 32px rgba(29, 78, 216, 0.2)',
      xl: '0 16px 64px rgba(29, 78, 216, 0.25)',
    },
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Mint',
    colors: {
      primary: '#10b981',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#d1fae5',
      primary200: '#a7f3d0',
      primary300: '#6ee7b7',
      secondary100: '#cffafe',
      secondary200: '#a5f3fc',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(16, 185, 129, 0.1)',
      md: '0 4px 16px rgba(16, 185, 129, 0.15)',
      lg: '0 8px 32px rgba(16, 185, 129, 0.2)',
      xl: '0 16px 64px rgba(16, 185, 129, 0.25)',
    },
  },
  {
    id: 'crimson-red',
    name: 'Crimson Fire',
    colors: {
      primary: '#dc2626',
      secondary: '#991b1b',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fee2e2',
      primary200: '#fecaca',
      primary300: '#fca5a5',
      secondary100: '#fef2f2',
      secondary200: '#fee2e2',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(220, 38, 38, 0.1)',
      md: '0 4px 16px rgba(220, 38, 38, 0.15)',
      lg: '0 8px 32px rgba(220, 38, 38, 0.2)',
      xl: '0 16px 64px rgba(220, 38, 38, 0.25)',
    },
  },
  {
    id: 'golden-yellow',
    name: 'Golden Sun',
    colors: {
      primary: '#f59e0b',
      secondary: '#d97706',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fffbeb',
      primary200: '#fef3c7',
      primary300: '#fde68a',
      secondary100: '#fff7ed',
      secondary200: '#ffedd5',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(245, 158, 11, 0.1)',
      md: '0 4px 16px rgba(245, 158, 11, 0.15)',
      lg: '0 8px 32px rgba(245, 158, 11, 0.2)',
      xl: '0 16px 64px rgba(245, 158, 11, 0.25)',
    },
  },
  {
    id: 'teal-cyan',
    name: 'Teal Ocean',
    colors: {
      primary: '#0d9488',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f0fdfa',
      primary200: '#ccfbf1',
      primary300: '#99f6e4',
      secondary100: '#cffafe',
      secondary200: '#a5f3fc',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(13, 148, 136, 0.1)',
      md: '0 4px 16px rgba(13, 148, 136, 0.15)',
      lg: '0 8px 32px rgba(13, 148, 136, 0.2)',
      xl: '0 16px 64px rgba(13, 148, 136, 0.25)',
    },
  },
  {
    id: 'indigo-purple',
    name: 'Indigo Dreams',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#eef2ff',
      primary200: '#e0e7ff',
      primary300: '#c7d2fe',
      secondary100: '#f3e8ff',
      secondary200: '#e9d5ff',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(99, 102, 241, 0.1)',
      md: '0 4px 16px rgba(99, 102, 241, 0.15)',
      lg: '0 8px 32px rgba(99, 102, 241, 0.2)',
      xl: '0 16px 64px rgba(99, 102, 241, 0.25)',
    },
  },
  {
    id: 'slate-gray',
    name: 'Slate Professional',
    colors: {
      primary: '#475569',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f8fafc',
      primary200: '#f1f5f9',
      primary300: '#e2e8f0',
      secondary100: '#f8fafc',
      secondary200: '#f1f5f9',
      accent100: '#f0f9ff',
      accent200: '#e0f2fe',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(71, 85, 105, 0.1)',
      md: '0 4px 16px rgba(71, 85, 105, 0.15)',
      lg: '0 8px 32px rgba(71, 85, 105, 0.2)',
      xl: '0 16px 64px rgba(71, 85, 105, 0.25)',
    },
  },
  {
    id: 'pink-magenta',
    name: 'Pink Blossom',
    colors: {
      primary: '#ec4899',
      secondary: '#be185d',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#fdf2f8',
      primary200: '#fce7f3',
      primary300: '#fbcfe8',
      secondary100: '#fdf2f8',
      secondary200: '#fce7f3',
      accent100: '#f3e8ff',
      accent200: '#e9d5ff',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(236, 72, 153, 0.1)',
      md: '0 4px 16px rgba(236, 72, 153, 0.15)',
      lg: '0 8px 32px rgba(236, 72, 153, 0.2)',
      xl: '0 16px 64px rgba(236, 72, 153, 0.25)',
    },
  },
  {
    id: 'lime-green',
    name: 'Lime Fresh',
    colors: {
      primary: '#65a30d',
      secondary: '#84cc16',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      primary100: '#f7fee7',
      primary200: '#ecfccb',
      primary300: '#d9f99d',
      secondary100: '#f7fee7',
      secondary200: '#ecfccb',
      accent100: '#fffbeb',
      accent200: '#fef3c7',
    },
    fonts: { primary: 'Inter', secondary: 'Poppins', accent: 'Inter' },
    shadows: {
      sm: '0 2px 8px rgba(101, 163, 13, 0.1)',
      md: '0 4px 16px rgba(101, 163, 13, 0.15)',
      lg: '0 8px 32px rgba(101, 163, 13, 0.2)',
      xl: '0 16px 64px rgba(101, 163, 13, 0.25)',
    },
  },
];

// Expanded Font Collections
const fontCollections: FontCollection[] = [
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    fonts: {
      primary: 'Inter',
      secondary: 'Poppins',
      accent: 'Roboto',
    },
    description: 'Clean, modern fonts perfect for tech and business websites',
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    fonts: {
      primary: 'Playfair Display',
      secondary: 'Merriweather',
      accent: 'Lora',
    },
    description: 'Sophisticated serif fonts for premium brands and editorial content',
  },
  {
    id: 'friendly-rounded',
    name: 'Friendly Rounded',
    fonts: {
      primary: 'Nunito',
      secondary: 'Quicksand',
      accent: 'Comfortaa',
    },
    description: 'Warm, approachable fonts for lifestyle and creative brands',
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    fonts: {
      primary: 'Source Sans Pro',
      secondary: 'Open Sans',
      accent: 'Montserrat',
    },
    description: 'Professional fonts ideal for corporate and business websites',
  },
  {
    id: 'creative-artistic',
    name: 'Creative Artistic',
    fonts: {
      primary: 'Oswald',
      secondary: 'Raleway',
      accent: 'Dancing Script',
    },
    description: 'Bold, creative fonts for artistic and design-focused websites',
  },
  {
    id: 'minimal-geometric',
    name: 'Minimal Geometric',
    fonts: {
      primary: 'Work Sans',
      secondary: 'Karla',
      accent: 'Space Mono',
    },
    description: 'Clean geometric fonts for minimal and modern designs',
  },
  {
    id: 'classic-traditional',
    name: 'Classic Traditional',
    fonts: {
      primary: 'Crimson Text',
      secondary: 'Libre Baskerville',
      accent: 'Old Standard TT',
    },
    description: 'Traditional serif fonts for classic and timeless designs',
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    fonts: {
      primary: 'Orbitron',
      secondary: 'Exo 2',
      accent: 'Rajdhani',
    },
    description: 'Futuristic fonts perfect for tech and gaming websites',
  },
];

const defaultTheme = colorCollections[0];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme);

  // Apply CSS variables to root for WEBSITE theme only
  useEffect(() => {
    if (!currentTheme) return;
    
    const root = document.documentElement;

    // Apply website colors (these change with theme)
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--website-color-${cssVar}`, value);
    });

    // Apply website fonts
    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--website-font-${key}`, `'${value}', sans-serif`);
    });

    // Apply website shadows
    if (currentTheme.shadows) {
      Object.entries(currentTheme.shadows).forEach(([key, value]) => {
        root.style.setProperty(`--website-shadow-${key}`, value);
      });
    }

    // Load Google Fonts
    const fontFamilies = Object.values(currentTheme.fonts);

    // Remove existing font link
    const existingLink = document.querySelector('link[data-website-fonts]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new font link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?${fontFamilies.map(font =>
      `family=${font.replace(' ', '+')}:wght@300;400;500;600;700;800;900`
    ).join('&')}&display=swap`;
    link.rel = 'stylesheet';
    link.setAttribute('data-website-fonts', 'true');
    document.head.appendChild(link);

    console.log('🎨 Theme applied:', currentTheme.name, currentTheme.colors);
  }, [currentTheme]);

  const updateTheme = (themeId: string) => {
    const theme = colorCollections.find(t => t.id === themeId);
    if (theme) {
      console.log('🔄 Updating theme to:', theme.name, theme.colors);
      setCurrentTheme(theme);
    } else {
      console.warn('⚠️ Theme not found:', themeId);
    }
  };

  const updateFonts = (fontCollectionId: string) => {
    const fontCollection = fontCollections.find(f => f.id === fontCollectionId);
    if (fontCollection) {
      console.log('🔤 Updating fonts to:', fontCollection.name);
      setCurrentTheme(prev => ({
        ...prev,
        fonts: {
          ...prev.fonts,
          ...fontCollection.fonts
        }
      }));
    } else {
      console.warn('⚠️ Font collection not found:', fontCollectionId);
    }
  };

  const applyCustomColors = (colors: Partial<ThemeConfig['colors']>) => {
    console.log('🎨 Applying custom colors:', colors);
    setCurrentTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, ...colors }
    }));
  };

  // Helper function to get CSS custom properties for website
  const getCSSVariables = () => {
    return {
      '--website-color-primary': currentTheme.colors.primary,
      '--website-color-secondary': currentTheme.colors.secondary,
      '--website-color-accent': currentTheme.colors.accent,
      '--website-color-background': currentTheme.colors.background,
      '--website-color-surface': currentTheme.colors.surface,
      '--website-color-text': currentTheme.colors.text,
      '--website-color-text-secondary': currentTheme.colors.textSecondary,
      '--website-color-border': currentTheme.colors.border,
      '--website-color-success': currentTheme.colors.success,
      '--website-color-warning': currentTheme.colors.warning,
      '--website-color-error': currentTheme.colors.error,
      '--website-color-primary-100': currentTheme.colors.primary100,
      '--website-color-primary-200': currentTheme.colors.primary200,
      '--website-color-primary-300': currentTheme.colors.primary300,
      '--website-color-secondary-100': currentTheme.colors.secondary100,
      '--website-color-secondary-200': currentTheme.colors.secondary200,
      '--website-color-accent-100': currentTheme.colors.accent100,
      '--website-color-accent-200': currentTheme.colors.accent200,
      '--website-font-primary': `'${currentTheme.fonts.primary}', sans-serif`,
      '--website-font-secondary': `'${currentTheme.fonts.secondary}', sans-serif`,
      '--website-font-accent': `'${currentTheme.fonts.accent}', serif`,
      '--website-shadow-sm': currentTheme.shadows.sm,
      '--website-shadow-md': currentTheme.shadows.md,
      '--website-shadow-lg': currentTheme.shadows.lg,
      '--website-shadow-xl': currentTheme.shadows.xl,
    };
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      availableThemes: colorCollections,
      availableFonts: fontCollections,
      updateTheme,
      updateFonts,
      applyCustomColors,
      getCSSVariables
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};