import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import Screen from '../components/ui/Screen';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';
import Button from '../components/ui/Button';

const screenWidth = Dimensions.get('window').width;

const STATS_BASE_URL = `${API_BASE_URL}/stats`;
const EVENTS_BY_DAY_URL = `${STATS_BASE_URL}/events-by-day`;

// Un día de eventos
type EventDay = {
  label: string;   // lo que se muestra: 28/11
  value: number;   // número de eventos
  dateKey: string; // clave para filtrar: 2025-11-28
};

// 🔹 Formatea label visible
const formatEventDayLabel = (d: any): string => {
  const raw = d.date ?? d._id ?? d.day;

  if (typeof raw === 'string' || typeof raw === 'number') {
    return String(raw);
  }

  if (raw && typeof raw === 'object') {
    const day = raw.day ?? raw.dia ?? raw.dayOfMonth;
    const month = raw.month ?? raw.mes ?? raw.monthValue;
    const year = raw.year ?? raw.anio ?? raw.yearValue;

    if (day && month && year) {
      const dd = String(day).padStart(2, '0');
      const mm = String(month).padStart(2, '0');
      return `${dd}/${mm}`;
    }
    if (day && month) {
      return `${day}/${month}`;
    }
  }

  return '?';
};

// 🔹 Genera clave YYYY-MM-DD para filtrar eventos
const buildDateKey = (d: any): string => {
  // Caso: ya viene un string tipo 2025-11-28
  if (typeof d.date === 'string') {
    return d.date.slice(0, 10);
  }

  const raw = d._id ?? d.day;

  if (raw && typeof raw === 'object') {
    const year = raw.year ?? raw.anio ?? raw.yearValue;
    const month = raw.month ?? raw.mes ?? raw.monthValue;
    const day = raw.day ?? raw.dia ?? raw.dayOfMonth;

    if (year && month && day) {
      const yy = String(year);
      const mm = String(month).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      return `${yy}-${mm}-${dd}`;  // 2025-11-28
    }
  }

  return ''; // fallback
};

export default function HistorialEventos() {
  const [eventsByDay, setEventsByDay] = useState<EventDay[]>([]);

  useEffect(() => {
    const fetchEventsByDay = async () => {
      try {
        const res = await fetch(EVENTS_BY_DAY_URL);
        const data = await res.json();
        console.log('EVENTS_BY_DAY response:', data);

        const points: EventDay[] = (data || []).map((d: any) => ({
          label: formatEventDayLabel(d),
          value: d.count || d.total || 0,
          dateKey: buildDateKey(d),
        }));

        setEventsByDay(points);
      } catch (e) {
        console.log('Error conexión events-by-day:', e);
      }
    };

    fetchEventsByDay();
    const intervalId = setInterval(fetchEventsByDay, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push('/profileView')} hitSlop={12}>
            <View style={styles.avatarPlaceholder} />
          </Pressable>
        </View>

        {/* Lista de días */}
        <View style={styles.card}>
          <Text style={styles.title}>Eventos por día</Text>

          {eventsByDay.length > 0 ? (
            eventsByDay.map((item, idx) => (
              <View key={idx} style={styles.reportItem}>
                <Text style={styles.reportTitle}>{item.label}</Text>
                <Text style={styles.reportDescription}>
                  Eventos: {item.value}
                </Text>

                <Button
                  title="Ver eventos"
                  style={{ marginTop: 8, width: '60%' }}
                  onPress={() =>
                    router.push({
                      pathname: '/eventosDia',
                      params: {
                        date: item.dateKey,
                        label: item.label,
                      },
                    })
                  }
                />
              </View>
            ))
          ) : (
            <Text style={styles.description}>Sin datos de eventos.</Text>
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
