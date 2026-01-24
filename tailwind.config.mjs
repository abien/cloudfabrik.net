/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // One Dark Pro Color Palette
        'bg-main': '#282c34',
        'bg-editor': '#21252b',
        'bg-hover': '#2c313a',
        'border': '#3e4451',
        'border-dark': '#181a1f',
        
        // Text Colors
        'text-primary': '#abb2bf',
        'text-muted': '#9fa6b3',
        'text-bright': '#ffffff',
        
        // Accent Colors
        'accent': '#61afef',
        'accent-hover': '#528bcc',
        
        // Syntax Colors
        'syntax-green': '#98c379',
        'syntax-purple': '#c678dd',
        'syntax-orange': '#d19a66',
        'syntax-red': '#e06c75',
        'syntax-cyan': '#56b6c2',
        'syntax-yellow': '#e5c07b',
        
        // Statusbar
        'statusbar-bg': '#61afef',
        'statusbar-text': '#111a21',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'Consolas', 'Monaco', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#abb2bf',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-lead': '#abb2bf',
            '--tw-prose-links': '#61afef',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-counters': '#5c6370',
            '--tw-prose-bullets': '#5c6370',
            '--tw-prose-hr': '#3e4451',
            '--tw-prose-quotes': '#abb2bf',
            '--tw-prose-quote-borders': '#61afef',
            '--tw-prose-captions': '#5c6370',
            '--tw-prose-code': '#61afef',
            '--tw-prose-pre-code': '#abb2bf',
            '--tw-prose-pre-bg': '#21252b',
            '--tw-prose-th-borders': '#3e4451',
            '--tw-prose-td-borders': '#3e4451',
            
            // Code styling
            code: {
              backgroundColor: '#2c313a',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            
            // Link styling
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            
            // Blockquote styling
            blockquote: {
              borderLeftColor: '#61afef',
              backgroundColor: 'rgba(97, 175, 239, 0.05)',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '1rem 1.5rem',
              fontStyle: 'italic',
            },
            
            // Table styling
            'thead th': {
              color: '#ffffff',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
