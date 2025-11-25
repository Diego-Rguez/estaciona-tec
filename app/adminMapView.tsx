import React, { useState, useEffect } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, View} from 'react-native';
import { mapViewStyles as styles } from '../theme/styles'; 
import Screen from '../components/ui/Screen';
import ParkingMap from '../components/ui/ParkingMap';
import { API_BASE_URL } from '../config/api';


type SpotId = '001' | '002' | '003';
type SpotStatus = 'available' | 'occupied';
type SpotsState = Record<SpotId, SpotStatus>;

const API_URL = `${API_BASE_URL}/spots`;

export default function mapView() {
  const pathname = usePathname();

  const [spotsStatus ,setSpotsStatus /* Si activamos la funcion de cambiar status al presionar */] = useState<SpotsState>({
    '001': 'available',
    '002': 'available',
    '003': 'available',
  });

/*const handleSpotPress = (id: SpotId) => {
  console.log('Click en spot', id);

  setSpotsStatus(prev => ({
    ...prev,
    [id]: prev[id] === 'OCCUPIED' ? 'AVAILABLE' : 'OCCUPIED',
  }));
}; */ //Funcion que hace que al presionar el spot cambie de estado, es de prueba nomas


  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json(); 

        const next: Partial<SpotsState> = {};

        data.forEach((spot: { spot_num: string; status: SpotStatus }) => {
          const id = spot.spot_num as SpotId;

          if (['001', '002', '003'].includes(id)) {
            next[id] = spot.status;
          }
        });

        setSpotsStatus(prev => ({
          ...prev,
          ...next
        }));
      } catch (error) {
        console.log("ERROR fetching spots:", error);
      }
    };

    fetchSpots(); 

    const interval = setInterval(fetchSpots, 2000);

    return () => clearInterval(interval);
  }, []);

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
