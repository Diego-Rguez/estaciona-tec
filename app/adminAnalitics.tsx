import React, { useEffect, useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, View, Dimensions } from 'react-native';
import Screen from '../components/ui/Screen';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { colors } from '../theme/colors';
import Button from '../components/ui/Button';

const screenWidth = Dimensions.get('window').width;

// BASE: /stats
const STATS_BASE_URL   = `${API_BASE_URL}/stats`;

const STATUS_COUNT_URL = `${STATS_BASE_URL}/status-count`;
const ZONE_OCC_URL     = `${STATS_BASE_URL}/zone-occupancy`;
const MOST_USED_URL    = `${STATS_BASE_URL}/most-used-zones`;
const AVG_DURATION_URL = `${STATS_BASE_URL}/average-duration`;
const PEAK_HOURS_URL   = `${STATS_BASE_URL}/peak-hours`;

const ZONE_ORDER = ['A', 'B'];

// Tipos básicos
type StatusCount = {
  available: number;
  occupied: number;
  blocked?: number;
};

type SimplePoint = { label: string; value: number };

// Tipo para la lista de horas pico
type PeakItem = {
  date: string;   // etiqueta, por ahora genérica
  hour: string;   // "14:00"
  count: number;  // número de eventos
};

// Formatear hora 14 -> "14:00"
const formatHourHHMM = (h: number): string => {
  const hh = h.toString().padStart(2, '0');
  return `${hh}:00`;
};

export default function AdminAnalytics() {
  const pathname = usePathname();

  const [statusCount, setStatusCount] = useState<StatusCount | null>(null);
  const [zoneOccupancy, setOccupancyByZone] = useState<SimplePoint[]>([]);
  const [mostUsedZones, setMostUsedZones] = useState<SimplePoint[]>([]);
  const [averageDuration, setAverageDuration] = useState<number | null>(null);
  const [peakHours, setPeakHours] = useState<PeakItem[]>([]);

  // =======================
  //  Fetch de estadísticas 
  // =======================
  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        // -------- Status de spots --------
        const resStatus = await fetch(STATUS_COUNT_URL);
        const dataStatus = await resStatus.json();
        if (resStatus.ok) {
          setStatusCount({
            available: dataStatus.available ?? 0,
            occupied: dataStatus.occupied ?? 0,
            blocked: dataStatus.blocked ?? 0,
          });
        } else {
          console.log('Error status-count:', dataStatus);
        }

        // -------- Ocupación por zona --------
        const res1 = await fetch(ZONE_OCC_URL);
        const data1 = await res1.json();

        const occPoints: SimplePoint[] = (data1 || []).map((d: any) => ({
          label: d.zone || d._id || '?',
          value: d.count || d.occupied || 0,
        }));

        occPoints.sort((a, b) => {
          const ia = ZONE_ORDER.indexOf(a.label);
          const ib = ZONE_ORDER.indexOf(b.label);
          return ia - ib;
        });

        setOccupancyByZone(occPoints);

        // -------- Zonas más usadas --------
        const res2 = await fetch(MOST_USED_URL);
        const data2 = await res2.json();
        console.log('MOST_USED_ZONES response (raw):', data2);

        if (res2.ok && Array.isArray(data2)) {
          const processed: SimplePoint[] = data2.map((d: any) => {
            const rawValue =
              d.events_count ??
              d.totalEvents ??
              d.count ??
              d.total ??
              0;

            const value = Number(rawValue);

            return {
              label: d.zone || d._id || 'Sin zona',
              value: isNaN(value) ? 0 : value,
            };
          });

          processed.sort((a, b) => {
            const ia = ZONE_ORDER.indexOf(a.label);
            const ib = ZONE_ORDER.indexOf(b.label);
            return ia - ib;
          });

          console.log('MOST_USED_ZONES FRONT:', processed);
          setMostUsedZones(processed);
        } else {
          console.log('Error most-used-zones:', data2);
          setMostUsedZones([]);
        }

        // -------- Duración promedio --------
        const res3 = await fetch(AVG_DURATION_URL);
        const data3 = await res3.json();
        console.log('AVG_DURATION response:', data3);

        let globalAvg: number | null = null;
        if (data3 && typeof data3 === 'object' && typeof data3.avgDuration === 'number') {
          globalAvg = data3.avgDuration;
        } else if (typeof data3 === 'number') {
          globalAvg = data3;
        } else {
          globalAvg = null;
        }
        setAverageDuration(globalAvg);

        // -------- Horas pico (últimos 7 días) -> lista --------
        const res4 = await fetch(PEAK_HOURS_URL);
        const data4 = await res4.json();
        console.log('PEAK_HOURS response:', data4);
        
        const peakPoints: PeakItem[] = (data4 || []).map((d: any, idx: number) => {
          const hourNumber = d.hour ?? d._id?.hour;
          const hourLabel =
            typeof hourNumber === 'number'
              ? formatHourHHMM(hourNumber)
              : '?';

          const count = Number(d.entries ?? d.count ?? d.total ?? 0);

          return {
            hour: hourLabel,
            count: isNaN(count) ? 0 : count,
          };
        });

        setPeakHours(peakPoints);
      } catch (e) {
        console.log('Error fetchAllStats:', e);
      }
    };

    fetchAllStats();
    const intervalId = setInterval(fetchAllStats, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Config general de charts
  const chartConfig: any = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '4',
      strokeWidth: '1',
      stroke: '#1E90FF',
    },
  };

  const toBarData = (points: SimplePoint[]) => ({
    labels: points.map(p => p.label),
    datasets: [
      {
        data: points.map(p => {
          const n = Number(p.value);
          return isNaN(n) ? 0 : n;
        }),
      },
    ],
  });

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

          {/* Status de Spots */}
          <View style={styles.card}>
            <Text style={styles.title}>Status de Spots</Text>
            {statusCount ? (
              <PieChart
                data={[
                  {
                    name: 'Disponibles',
                    population: statusCount.available,
                    color: '#adacb7ff',
                    legendFontColor: '#333',
                    legendFontSize: 8,
                  },
                  {
                    name: 'Ocupados',
                    population: statusCount.occupied,
                    color: colors.primary,
                    legendFontColor: '#333',
                    legendFontSize: 8,
                  },
                  {
                    name: 'Bloqueados',
                    population: statusCount.blocked ?? 0,
                    color: '#CCCCCC',
                    legendFontColor: '#333',
                    legendFontSize: 8,
                  },
                ].filter(d => d.population > 0)}
                width={screenWidth * 0.85}
                height={180}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="10"
                hasLegend
              />
            ) : (
              <Text style={styles.description}>Cargando datos...</Text>
            )}
          </View>

          <Button
            title="Ver historial de eventos"
            onPress={() => router.push('/historialEventos')}
            style={styles.button}
          />
          <Button
            title="Spots mal estacionados"
            onPress={() => router.push('/spotsMalEstacionados')}
            style={styles.button2}
          />


          {/* Ocupación por zona */}
          <View style={styles.card}>
            <Text style={styles.title}>Ocupación por zona</Text>
            {zoneOccupancy.length > 0 ? (
              <BarChart
                {...({
                  data: toBarData(zoneOccupancy),
                  width: screenWidth * 0.68,
                  height: 200,
                  chartConfig,
                  style: { marginTop: 8, borderRadius: 16 },
                } as any)}
              />
            ) : (
              <Text style={styles.description}>Sin datos de zonas.</Text>
            )}
          </View>

          {/* Zonas más usadas */}
          <View style={styles.card}>
            <Text style={styles.title}>Zonas más usadas (7 días)</Text>
            {mostUsedZones.length > 0 ? (
              <BarChart
                {...({
                  data: toBarData(mostUsedZones),
                  width: screenWidth * 0.68,
                  height: 200,
                  chartConfig,
                  style: { marginTop: 8, borderRadius: 16 },
                } as any)}
              />
            ) : (
              <Text style={styles.description}>Sin datos recientes.</Text>
            )}
          </View>

          {/* Duración promedio */}
          <View style={styles.card}>
            <Text style={styles.title}>Duración promedio</Text>
            {averageDuration != null ? (
              <Text style={styles.description}>
                {averageDuration.toFixed(1)} minutos por sesión (promedio)
              </Text>
            ) : (
              <Text style={styles.description}>Sin datos de duración.</Text>
            )}
          </View>

          {/* Horas pico*/}
          <View style={styles.card}>
            <Text style={styles.title}>Horas pico (últimos 7 días)</Text>
            {peakHours.length > 0 ? (
              peakHours.map((item, idx) => (
                <View key={idx} style={{ marginBottom: 8 }}>
                  <Text style={styles.title}>{item.date}</Text>
                  <Text style={styles.description}>
                    Hora: {item.hour} · Eventos: {item.count}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.description}>Sin datos de horas pico.</Text>
            )}
          </View>

          <Button
            title="Asignar Admin"
            onPress={() => router.push('/assignAdmin')}
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
