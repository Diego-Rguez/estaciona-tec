import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Link } from 'expo-router';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import Screen from '../components/ui/Screen';


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


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    flex: 1,
  },
  logo: {
    width: 80,          
    height: 50,
    marginBottom: spacing.xl,
  },
  link: {
    color: colors.primaryDark,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  info: {
    ...typography.h2,
    textAlign: 'center',
    color: colors.primaryMid,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    color: colors.text,
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  mascot: {
    width: 170,
    height: 170,
    marginTop: spacing.xl,
  },
  avatarPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.surface,  
    borderWidth: 1,
    borderColor: colors.divider, 
    marginBottom: spacing.xxl, 
    marginTop: spacing.xl,  
},
});
