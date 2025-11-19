import React from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, View } from 'react-native';
import Screen from '../components/ui/Screen';
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
            <Text style={styles.title}>Plazas Totales</Text>
            <Text style={styles.description}>100</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Plazas Ocupadas</Text>
            <Text style={styles.description}>88</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Sensores con fallas</Text>
            <Text style={styles.description}>1</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Alertas del día</Text>
            <Text style={styles.description}>4</Text>
          </View>

          <View style={styles.canvas} />

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
