import React from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, View } from 'react-native';
import { mapViewStyles as styles } from '../theme/styles'; 
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
