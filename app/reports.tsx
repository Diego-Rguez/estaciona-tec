import React, { useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import Button from '../components/ui/Button';
import Screen from '../components/ui/Screen';
import { reportsStyles as styles } from '../theme/styles'; 

export default function RegisterScreen() {
  const [reportText, setReportText] = useState('');
  const pathname = usePathname(); // <-- hook dentro del componente

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
              placeholder="Numero de spot (opcional)"
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

            <Button title="Enviar" onPress={() => {}} style={styles.button} />
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

