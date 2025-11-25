import React, { useState } from 'react';
import { View, Text, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import Screen from '../components/ui/Screen';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { spacing } from '../theme/spacing';
import { loginStyles as styles } from '../theme/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/auth/login`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    // Validación básica
    if (!email || !pwd) {
      return Alert.alert('Error', 'Ingresa tu correo y contraseña.');
    }

    try {
      setLoading(true); // Evita doble clic y cambia texto del botón

      // Llamamos a la API con la información del formulario
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),    // Quita espacios adicionales
          password: pwd.trim(),
        }),
      });

      // Convertimos la respuesta a JSON
      const data = await res.json();

      // Si la API regresa error, mostramos el mensaje
      if (!res.ok) {
        return Alert.alert('Error', data.error || 'No se pudo iniciar sesión.');
      }

      // Guardamos el usuario en AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Navegación según el rol (admin o usuario normal)
      if (data.user.role === "admin") {
        router.replace("/adminMapView");
      } else {
        router.replace("/mapView");
      }

    } catch (error) {
      console.log('LOGIN ERROR:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

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

          {/* Botón principal */}
          <Button
            title={loading ? 'Entrando...' : 'Continuar'}
            onPress={handleLogin}
            style={styles.button}
            disabled={loading}
          />

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
