import React, { useEffect, useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, View } from 'react-native';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/reports`;

// Tipo de reporte según tu schema
type Report = {
  _id: string;
  spot_num?: string;
  user_ID: string;
  description: string;
  status: 'pending' | 'resolved';
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminAnalytics() {
  const pathname = usePathname();

  // Número de reportes pendientes
  const [pendingCount, setPendingCount] = useState(0);
  // Lista de reportes pendientes para mostrar en tarjetas
  const [pendingReports, setPendingReports] = useState<Report[]>([]);

  // Traemos todos los reportes y filtramos los que tienen status "pending"
  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (!res.ok) {
          console.log("Error al obtener reportes:", data);
          return;
        }

        // Filtramos solo los reportes con status "pending"
        const pendings: Report[] = data.filter(
          (report: Report) => report.status === "pending"
        );

        setPendingReports(pendings);
        setPendingCount(pendings.length);

      } catch (error) {
        console.log("Error de conexión con la API:", error);
      }
    };

    fetchPendingReports();

    // refrescar cada 3 segundos
    const interval = setInterval(fetchPendingReports, 3000);
    return () => clearInterval(interval);

  }, []);

  // Cambiamos el status de un reporte a "resolved" y lo sacamos de la lista
  const resolveReport = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "resolved" }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Error al actualizar estado:", data);
        return;
      }

      // Quitamos el reporte resuelto del estado local
      setPendingReports(prev => prev.filter(report => report._id !== id));

      // Bajamos el contador
      setPendingCount(prev => Math.max(prev - 1, 0));

    } catch (error) {
      console.log("Error resolviendo reporte:", error);
    }
  };

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
            <Text style={styles.description}>{pendingCount}</Text>
          </View>

          {/* Mostrar todos los reportes con status pending */}
          <View style={styles.card}>
            <Text style={styles.title}>Detalle de reportes pendientes</Text>

            {pendingReports.length === 0 ? (
              <Text style={styles.description}>
                No hay reportes pendientes.
              </Text>
            ) : (
              pendingReports.map((report) => (
                <View key={report._id} style={styles.reportItem}>
                  <Text style={styles.reportTitle}>
                    {report.spot_num
                      ? `Spot: ${report.spot_num}`
                      : 'Reporte sin spot'}
                  </Text>

                  <Text style={styles.reportDescription}>
                    {report.description}
                  </Text>

                  <Text style={styles.reportMeta}>
                    Usuario ID: {report.user_ID}
                  </Text>

                  {report.createdAt && (
                    <Text style={styles.reportMeta}>
                      Fecha: {new Date(report.createdAt).toLocaleString()}
                    </Text>
                  )}

                  {/* Botón para marcar como resuelto */}
                  <Button
                    title="Marcar como resuelto"
                    onPress={() => resolveReport(report._id)}
                    style={{ marginTop: 8 }}
                  />
                </View>
              ))
            )}
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
