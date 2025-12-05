import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';

const EVENTS_URL = `${API_BASE_URL}/events`;

type EventItem = {
  _id: string;
  spot_num?: string;
  zone?: string;
  status?: string;
  type?: string;
  event_type?: string;
  createdAt?: string;
  timestamp?: string;
};

export default function EventosDia() {
  const { date, label } = useLocalSearchParams<{ date?: string; label?: string }>();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (!date) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(EVENTS_URL);
        const data: EventItem[] = await res.json();

        // normalizamos yyyy-mm-dd de cada evento
        const sameDay = (data || []).filter((ev) => {
          const rawTs = ev.timestamp || ev.createdAt || (ev as any).time || (ev as any).date;
          if (!rawTs) return false;

          const d = new Date(rawTs);
          if (isNaN(d.getTime())) return false;

          const key = d.toISOString().slice(0, 10); 
          return key === date;
        });

        setEvents(sameDay);
      } catch (e) {
        console.log('Error al obtener eventos:', e);
      }
    };

    fetchEvents();
  }, [date]);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header simple con back */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <View style={styles.avatarPlaceholder} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            Eventos del día {label || date || ''}
          </Text>

          {(!date || events.length === 0) ? (
            <Text style={styles.description}>
              No se encontraron eventos para este día.
            </Text>
          ) : (
            events.map((ev) => {
              const rawTs =
                ev.timestamp || ev.createdAt || (ev as any).time || (ev as any).date;
              const dateStr = rawTs
                ? new Date(rawTs).toLocaleString()
                : 'Sin fecha';

              return (
                <View key={ev._id} style={styles.reportItem}>
                  <Text style={styles.reportTitle}>
                    Spot: {ev.spot_num || 'N/A'}
                  </Text>

                  {ev.zone && (
                    <Text style={styles.reportMeta}>Zona: {ev.zone}</Text>
                  )}

                  {(ev.status || ev.type || ev.event_type) && (
                    <Text style={styles.reportMeta}>
                      Tipo:{' '}
                      {ev.type || ev.event_type || ev.status}
                    </Text>
                  )}

                  <Text style={styles.reportMeta}>Fecha/hora: {dateStr}</Text>
                </View>
              );
            })
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
