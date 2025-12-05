import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';

const STATS_BASE_URL = `${API_BASE_URL}/stats`;
const BAD_PARKING_URL = `${STATS_BASE_URL}/bad-parking-spots`;

// Tipo base 
type BadSpot = {
  _id?: string;
  spot_num?: string;
  zone?: string;
  reason?: string;
  status?: string;
  lastEventAt?: string;
  createdAt?: string;
};

export default function SpotsMalEstacionados() {
  const [badSpots, setBadSpots] = useState<BadSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadSpots = async () => {
      try {
        const res = await fetch(BAD_PARKING_URL);
        const data = await res.json();
        console.log('BAD_PARKING_SPOTS response:', data);

        if (!res.ok) {
          console.log('Error al obtener spots mal estacionados:', data);
          setBadSpots([]);
          return;
        }

        setBadSpots(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log('Error de conexión BAD_PARKING_SPOTS:', error);
        setBadSpots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBadSpots();

    const intervalId = setInterval(fetchBadSpots, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const renderDate = (spot: BadSpot) => {
    const raw = spot.lastEventAt || spot.createdAt;
    if (!raw) return 'Sin fecha';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleString();
  };

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con botón back simple */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <View style={styles.avatarPlaceholder} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Spots mal estacionados</Text>

          {loading ? (
            <Text style={styles.description}>Cargando...</Text>
          ) : badSpots.length === 0 ? (
            <Text style={styles.description}>
              No hay spots mal estacionados actualmente.
            </Text>
          ) : (
            badSpots.map((spot, idx) => (
              <View
                key={spot._id ?? idx}
                style={styles.reportItem}
              >
                <Text style={styles.reportTitle}>
                  Spot: {spot.spot_num || 'N/A'}
                </Text>

                {spot.zone && (
                  <Text style={styles.reportMeta}>
                    Zona: {spot.zone}
                  </Text>
                )}

                {(spot.reason || spot.status) && (
                  <Text style={styles.reportDescription}>
                    {spot.reason || `Estado: ${spot.status}`}
                  </Text>
                )}

                <Text style={styles.reportMeta}>
                  Último evento: {renderDate(spot)}
                </Text>
              </View>
            ))
          )}
        </View>

        <Button 
            title="Regresar" 
            onPress={() => router.push('/adminAnalitics')} 
            style={styles.button} 
          />
      </ScrollView>
    </Screen>
  );
}
