import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Screen from '../components/ui/Screen';
import { profileViewStyles as styles } from '../theme/styles'; 


export default function RegisterScreen() {
  return (
    <Screen>
        <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        >
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.info}>A01742085</Text>
        <Text style={styles.info}>Diego Rodríguez Sánchez</Text>
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
  )
}
