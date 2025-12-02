// app/_layout.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';
import { View, ActivityIndicator, Text, Pressable} from "react-native";
import { router } from "expo-router";
import { layoutStyles as styles } from '../theme/styles';


const BAD_PARKING_URL = `${API_BASE_URL}/stats/bad-parking-spots`;

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const [lastBadCount, setLastBadCount] = useState(0);
  const initializedRef = useRef(false);

  const [showBadBanner, setShowBadBanner] = useState(false);
  const [badBannerText, setBadBannerText] = useState("Se detectó un spot mal estacionado");

  // ============================
  // LEER ROL DESDE STORAGE
  // ============================
  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const json = await AsyncStorage.getItem("user");
        if (json) {
          const user = JSON.parse(json);
          setRole(user.role || null);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.log("Error cargando rol:", err);
      }
    };

    // leer una vez al inicio
    loadUserRole();

  // volver a leer cada 2 segundos por si cambias de cuenta
  const intervalId = setInterval(loadUserRole, 2000);

  return () => clearInterval(intervalId);
}, []);

  // PRELOAD DE LAS IMAGENES PARA UNA FLUIDEZ VISUAL
  useEffect(() => {
    async function preloadAssets() {
      try {
        await Asset.loadAsync([
          require('../assets/borregoManeja.png'),
          require('../assets/borregoPregunta.png'),
          require('../assets/logo-estacionatec.png'),
          require('../assets/borregoLike.png'),
          require('../assets/borregoSaluda.png'),
          require('../assets/borregoTelefono.png'),
        ]);
      } catch (e) {
        console.warn('Error precargando imágenes', e);
      } finally {
        setReady(true);
      }
    }

    preloadAssets();
  }, []);

  // ALERTA GLOBAL: BAD PARKING
  // SOLO PARA ADMIN
useEffect(() => {
  if (!ready) return;

  const checkBadParking = async () => {
    try {
      if (role !== "admin") return;

      const res = await fetch(BAD_PARKING_URL);
      const data = await res.json();

      if (!Array.isArray(data)) return;

      const current = data.length;

      setLastBadCount((prev) => {
        if (!initializedRef.current) {
          initializedRef.current = true;
          return current;
        }

        if (current > prev) {
          setBadBannerText("Se detectó un vehículo mal estacionado.");
          setShowBadBanner(true);

          setTimeout(() => {
            setShowBadBanner(false);
          }, 6000);
        }

        return current;
      });
    } catch (err) {
      console.log("Error BAD_PARKING:", err);
    }
  };

  checkBadParking();
  const interval = setInterval(checkBadParking, 3000);

  return () => clearInterval(interval);
}, [ready, role]);

useEffect(() => {
  if (role !== "admin") {
    setShowBadBanner(false);
    initializedRef.current = false;
    setLastBadCount(0);
  }
}, [role]);


  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0071CE" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Banner flotante */}
      {showBadBanner && (
        <View style={styles.badBanner}>
          <Text style={styles.badBannerText}>{badBannerText}</Text>

          <Pressable
            onPress={() => {
              setShowBadBanner(false);
              router.push("/spotsMalEstacionados");
            }}
            style={styles.badBannerButton}
          >
            <Text style={styles.badBannerButtonText}>Ver</Text>
          </Pressable>
        </View>
      )}

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="mapView" />
        <Stack.Screen name="reports" />
        <Stack.Screen name="profileView" />
        <Stack.Screen name="parkingMap" />
        <Stack.Screen name="adminReportView" />
        <Stack.Screen name="adminMapView" />
        <Stack.Screen name="reportsAdmin" />
        <Stack.Screen name="historialReportes" />
        <Stack.Screen name="historialEventos" />
        <Stack.Screen name="assignAdmin" />
        <Stack.Screen name="eventosDia" />
        <Stack.Screen name="spotsMalEstacionados" />
      </Stack>
    </View>
  );
}

