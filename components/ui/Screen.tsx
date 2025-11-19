import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';

type Props = PropsWithChildren<{ padded?: boolean; }>;

export default function Screen({ children, padded = true }: Props) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safe} />
      <View style={[styles.content, padded && styles.padded]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primaryMid }, // top azul curvo
  safe: { backgroundColor: colors.primaryMid },
  content: {
    flex: 1,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  padded: { padding: 20 },
});
