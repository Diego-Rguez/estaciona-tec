import React, { useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, View } from 'react-native';
import { mapViewStyles as styles } from '../theme/styles'; 
import Screen from '../components/ui/Screen';
import ParkingMap from '../components/ui/ParkingMap';


type SpotId = 'A1' | 'A2' | 'A3';
type SpotStatus = 'AVAILABLE' | 'OCCUPIED';
type SpotsState = Record<SpotId, SpotStatus>;


export default function mapView() {
  const pathname = usePathname();

  const [spotsStatus /*,setSpotsStatus Si activamos la funcion de cambiar status al presionar */] = useState<SpotsState>({
    A1: 'AVAILABLE',
    A2: 'OCCUPIED',
    A3: 'AVAILABLE',
  });

/*const handleSpotPress = (id: SpotId) => {
  console.log('Click en spot', id);

  setSpotsStatus(prev => ({
    ...prev,
    [id]: prev[id] === 'OCCUPIED' ? 'AVAILABLE' : 'OCCUPIED',
  }));
}; */ //Funcion que hace que al presionar el spot cambie de estado, es de prueba nomas

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

          {/* Mapa interactivo */}
          <ParkingMap 
            spotsStatus={spotsStatus} 
            //onSpotPress={handleSpotPress} Si quieres que se active la funcion de cambiar estado al presionar

          />

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
