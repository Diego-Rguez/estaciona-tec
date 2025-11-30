import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../components/ui/Screen';
import { profileViewStyles as styles } from '../theme/styles'; 

export default function ProfileScreen() {

  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const handleLogout = async () => {
  await AsyncStorage.removeItem("user");
  router.replace("/login");
};

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
        <Pressable 
          onPress={() => router.back()} 
          style={{ position: 'absolute', left: 20, top: 40, zIndex: 50 }}
        >
        <Text style={{ fontSize: 25, color: '#0F64A6' }}>←</Text>
        </Pressable>

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

        <Pressable onPress={handleLogout}>
          <Text style={styles.link}>Cerrar Sesión</Text>
        </Pressable>


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
