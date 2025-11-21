import React from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, View } from 'react-native';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { adminAnalyticsStyles as styles } from '../theme/styles'; 

export default function mapView() {
  const pathname = usePathname();
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={() => router.push('/profileView')} hitSlop={12}>
              <View style={styles.avatarPlaceholder} />
            </Pressable>

            <View style={styles.tabs}>
              <Link
                href="/adminReportView"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/adminReportView') ? styles.activeTab : undefined,
                ]}
              >
                Reportes
              </Link>

              <Link
                href="/adminMapView"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/adminMapView') ? styles.activeTab : undefined,
                ]}
              >
                Mapa
              </Link>

              <Link
                href="/adminAnalitics"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/adminAnalitics') ? styles.activeTab : undefined,
                ]}
              >
                Analiticas
              </Link>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Reportes Totales</Text>
            <Text style={styles.description}>5</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Descargar Reportes</Text>
            <Text style={styles.link}>Descargar</Text>
          </View>
          <Button title="Reportar problema" onPress={() => router.push('/reports')} style={styles.button} />
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
