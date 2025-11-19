import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { spacing } from '../../theme/spacing';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
};

export default function Button({ title, onPress, loading, variant='primary', style, disabled }: Props) {
  const s = getStyles(variant, disabled);
  return (
    <Pressable onPress={onPress} disabled={disabled || loading} style={[s.container, style]}>
      {loading ? <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary}/> : <Text style={s.text}>{title}</Text>}
    </Pressable>
  );
}

const getStyles = (variant: Props['variant'], disabled?: boolean) => StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg, // ~14 como en el mockup
    backgroundColor:
      variant === 'primary' ? (disabled ? '#9CC3E3' : colors.primary) :
      variant === 'outline' ? 'transparent' : 'transparent',
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? colors.primary : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: variant === 'primary' ? colors.white : colors.primary,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
