import React, { useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radius } from '../theme/radius';
import { typography } from '../theme/typography';
import Button from '../components/ui/Button';
import Screen from '../components/ui/Screen';

export default function RegisterScreen() {
  const [reportText, setReportText] = useState('');
  const pathname = usePathname(); // <-- hook dentro del componente

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.push('/profileView')} hitSlop={12}>
              <View style={styles.avatarPlaceholder} />
            </Pressable>

            {/* Tabs navegables */}
            <View style={styles.tabs}>
              <Link
                href="/reports"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/reports') ? styles.activeTab : undefined,
                ]}
              >
                Reportes
              </Link>

              <Link
                href="/mapView"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/mapView') ? styles.activeTab : undefined,
                ]}
              >
                Mapa
              </Link>
            </View>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Generar Reporte</Text>
            <Text style={styles.description}>
              ¡Ups! Parece que algo no salió bien. Cuéntanos qué pasó para que podamos
              mejorar tu experiencia en EstacionaTEC.
            </Text>

            <TextInput
              style={styles.textArea}
              placeholder="Reporte"
              placeholderTextColor={colors.muted}
              value={reportText}
              onChangeText={setReportText}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              autoCorrect
              autoCapitalize="sentences"
              maxLength={600}
              returnKeyType="default"
            />

            <Button title="Enviar" onPress={() => {}} style={styles.button} />
          </View>

          {/* Mascota y logo */}
          <Image
            source={require('../assets/borregoPregunta.png')}
            style={styles.mascot}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/logo-estacionatec.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    width: '100%',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    position: 'relative',
  },
  tabs: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -60 }],
    flexDirection: 'row',
    gap: spacing.lg,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  tabSelect: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingBottom: 2,
  },
  tabUnselect: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.divider, 
    paddingBottom: 2,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: colors.primary, 
    color: colors.primary,       
  },
  card: {
    width: '90%',
    minHeight: 380,
    padding: spacing.lg,
    borderRadius: radius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xxl,
  },
  mascot: {
    width: 170,
    height: 170,
    marginTop: spacing.xl,
  },
  logo: {
    width: 110,
    height: 40,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.hG,
    color: colors.text,
    textAlign: 'left',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    marginTop: spacing.sm,
    padding: spacing.md,
    alignSelf: 'center',
  },
  textArea: {
    height: 140, // alto fijo
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.md,
  },
});
