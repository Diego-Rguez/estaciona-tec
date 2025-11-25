import React, { useEffect, useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, View } from 'react-native';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';


const API_URL = `${API_BASE_URL}/reports`;

export default function AdminAnalytics() {
  const pathname = usePathname();

  // Estado para guardar cuántos reportes están pendientes
  const [pendingCount, setPendingCount] = useState(0);

  // Traemos todos los reportes y contamos los que tienen el status pending
  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!res.ok) {
          console.log("Error al obtener reportes:", data);
          return;
        }

        // Contamos todos los reportes con status "pending"
        const count = data.filter(
          (report: { status: string }) => report.status === "pending"
        ).length;

        setPendingCount(count);

      } catch (error) {
        console.log("Error de conexión con la API:", error);
      }
    };

    fetchPendingReports();

    // refrescar cada 10 segundos
    const interval = setInterval(fetchPendingReports, 10000);
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

          {/* Reportes por atender */}
          <View style={styles.card}>
            <Text style={styles.title}>Reportes por atender:</Text>

            {/* Aquí mostramos el número REAL */}
            <Text style={styles.description}>{pendingCount}</Text>
          </View>

          {/* CARD: Descargar */}
          <View style={styles.card}>
            <Text style={styles.title}>Descargar Reportes</Text>
            <Text style={styles.link}>Descargar</Text>
          </View>

          <Button 
            title="Reportar problema" 
            onPress={() => router.push('/reportsAdmin')} 
            style={styles.button} 
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
