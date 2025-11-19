// app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { Asset } from 'expo-asset';
import { View, ActivityIndicator } from 'react-native';


export default function RootLayout() {
  const [ready, setReady] = useState(false);

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

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0071CE" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="mapView" />
      <Stack.Screen name="reports" />
      <Stack.Screen name="profileView" />
      <Stack.Screen name="parkingMap" />
      <Stack.Screen name="adminReportView"/>
    </Stack>
  );
}