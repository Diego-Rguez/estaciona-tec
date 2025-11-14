import { TextStyle } from 'react-native';

// Títulos centrados y pesos marcados como en Login/Registro/Reportes.
export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 28, fontWeight: '800', letterSpacing: 0.2, color: '#3C395C' },
  hG: {fontSize: 25, fontWeight: '800', letterSpacing: 0.2, color: '#3C395C'},
  h2: { fontSize: 22, fontWeight: '700', letterSpacing: 0.2, color: '#3C395C' },
  h3: { fontSize: 18, fontWeight: '600', color: '#3C395C' },
  body: { fontSize: 16, fontWeight: '400', color: '#3C395C' },
  caption: { fontSize: 13, color: '#64627C' },
};