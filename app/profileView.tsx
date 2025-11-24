import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/ui/Screen';
import { profileViewStyles as styles } from '../theme/styles'; 

export default function ProfileScreen() {

  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    };
    loadUser();
  }, []);

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>Perfil</Text>

        <View style={styles.avatarPlaceholder} />

        {/* Email usuario */}
        <Text style={styles.info}>
          {user?.email ?? "Cargando correo..."}
        </Text>

        {/* Nombre usuario */}
        <Text style={styles.info}>
          {user?.name ?? "Cargando nombre..."}
        </Text>

        <Link href="/login" style={styles.link}>
          Cerrar Sesión
        </Link>

        <Image
          source={require('../assets/borregoLike.png')}
          style={styles.mascot}
          resizeMode="contain"
        />

        <Image
          source={require('../assets/logo-estacionatec.png')}
          style={styles.logo}
          resizeMode="contain"
        />

      </ScrollView>
    </Screen>
  );
}
