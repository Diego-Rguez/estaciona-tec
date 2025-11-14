import React, { useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radius } from '../theme/radius';
import Screen from '../components/ui/Screen';


export default function mapView() {
  const pathname = usePathname();

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

            {/* Tabs */}
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

          {/* Lienzo gris */}
          <View style={styles.canvas} />

          {/* Mascota y logo */}
          <Image
            source={require('../assets/borregoManeja.png')}
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
  canvas: {
    width: '90%',
    minHeight: 380,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xxl,
  },
  mascot: {
    width: 160,
    height: 160,
    marginTop: spacing.xxl,
  },
  logo: {
    width: 110,
    height: 40,
    marginBottom: spacing.xxl,
  },
});
