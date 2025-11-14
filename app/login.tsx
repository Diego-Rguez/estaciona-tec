import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { router } from 'expo-router';
import Screen from '../components/ui/Screen';             
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { colors } from '../theme/colors';                  
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>

          {/* Logo */}
          <Image
            source={require('../assets/logo-estacionatec.png')} 
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Título */}
          <Text style={styles.title}>Iniciar Sesión</Text>

          {/* Formulario */}
          <View style={styles.form}>
            <Input
              placeholder="Correo Institucional"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Contraseña"
              secureTextEntry
              value={pwd}
              onChangeText={setPwd}
              style={{ marginTop: spacing.sm }}
            />
          </View>
            
          {/* Botón Temporal */}
          <Button title="Continuar" onPress={() => router.push('/mapView')} style={styles.button} />       
          {/* Botón Temporal */}
          <Button title="Analiticas" onPress={() => router.push('/adminAnalitics')} style={styles.button} />
          {/* Link a Registro */}
          <Text style={styles.helper}>
            ¿No tienes cuenta?{' '}
            <Link href="/register" style={styles.link}>
              Regístrate
            </Link>
          </Text>

          {/* Mascota */}
          <Image
            source={require('../assets/borregoTelefono.png')}        
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    flex: 1,
  },
  logo: {
    width: 260,         
    height: 90,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  form: {
    width: '88%',        
    marginBottom: spacing.md,
  },
  button: {
    width: '88%',
    marginTop: spacing.sm,
  },
  helper: {
    marginTop: spacing.lg,
    color: colors.muted,
  },
  link: {
    color: colors.primaryDark,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  mascot: {
    width: 250,
    height: 250,
    marginTop: spacing.xl,
  },
});
