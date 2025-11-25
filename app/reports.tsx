import React, { useState, useEffect } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, TextInput, View, Alert } from 'react-native';
import { colors } from '../theme/colors';
import Button from '../components/ui/Button';
import Screen from '../components/ui/Screen';
import { reportsStyles as styles } from '../theme/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';


const API_URL = `${API_BASE_URL}/reports`;

type StoredUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export default function ReportsScreen() {
  const [reportText, setReportText] = useState('');
  const [spotNumText, setSpotNumText] = useState('');
  const [user, setUser] = useState<StoredUser | null>(null);
  const pathname = usePathname();

  // Cargar usuario desde AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem("user"); // leer del storage
        if (raw) {
          const parsed: StoredUser = JSON.parse(raw); // convertir a objeto
          setUser(parsed);
        }
      } catch (err) {
        console.log("Error leyendo usuario de AsyncStorage:", err);
      }
    };
    loadUser();
  }, []);

  const handleSendReport = async () => {
    // Validar que haya texto en el reporte
    if (!reportText.trim()) {
      return Alert.alert('Error', 'Por favor escribe tu reporte antes de enviarlo.');
    }

    // Validar que tengamos usuario cargado (por si alguien llega aquí sin login)
    if (!user) {
      return Alert.alert(
        'Sesión requerida',
        'No pudimos identificar tu usuario. Por favor inicia sesión de nuevo.'
      );
    }

    try {
      // Armamos el body según tu schema
      const body: any = {
        description: reportText.trim(),
        user_ID: user.id, // viene de tu backend (id: user._id)
      };

      // spot_num es opcional
      const spotTrimmed = spotNumText.trim();
      if (spotTrimmed.length > 0) {
        body.spot_num = spotTrimmed;
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        return Alert.alert('Error', data.error || 'No se pudo enviar el reporte.');
      }

      Alert.alert('Listo', 'Tu reporte fue enviado. ¡Gracias por ayudarnos a mejorar!');

      // Limpiar campos después de enviar
      setReportText('');
      setSpotNumText('');

    } catch (error) {
      console.log('REPORT ERROR:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
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

            {/* Tabs navegables */}
            <View style={styles.tabs}>
              <Link
                href="/reports"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/reports') ? styles.activeTab : undefined,
                ]}
              >
                Reportes
              </Link>

              <Link
                href="/mapView"
                style={[
                  styles.tabUnselect,
                  pathname?.includes('/mapView') ? styles.activeTab : undefined,
                ]}
              >
                Mapa
              </Link>
            </View>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Generar Reporte</Text>
            <Text style={styles.description}>
              ¡Ups! Parece que algo no salió bien. Cuéntanos qué pasó para que podamos
              mejorar tu experiencia en EstacionaTEC.
            </Text>

            <TextInput
              style={styles.textArea1}
              placeholder="Número de spot (opcional)"
              placeholderTextColor={colors.muted}
              value={spotNumText}
              onChangeText={setSpotNumText}
              multiline
              numberOfLines={2}
              textAlignVertical="top"
              autoCorrect
              autoCapitalize="none"
              maxLength={20}
              returnKeyType="default"
            />

            <TextInput
              style={styles.textArea2}
              placeholder="Reporte"
              placeholderTextColor={colors.muted}
              value={reportText}
              onChangeText={setReportText}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              autoCorrect
              autoCapitalize="sentences"
              maxLength={600}
              returnKeyType="default"
            />

            <Button 
              title="Enviar" 
              onPress={handleSendReport} 
              style={styles.button} 
            />
          </View>

          {/* Mascota y logo */}
          <Image
            source={require('../assets/borregoPregunta.png')}
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
