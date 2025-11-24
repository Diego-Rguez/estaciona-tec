import React, { useState } from 'react';
import { View, Text, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import Screen from '../components/ui/Screen';             
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';               
import { spacing } from '../theme/spacing';
import { loginStyles as styles } from '../theme/styles'; 

const API_URL = 'http://192.168.0.199:5100/auth/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    //Checamos que los campos tengan datos
    if (!email || !pwd) {
      return Alert.alert('Error', 'Ingresa tu correo y contraseña.');
    }

    try {
      // Cambiamos el texto del boton a Entrando.. para evitar que el usuario haga doble clic
      setLoading(true);

      // Llamamos a la api enviandole la informacio ingresada en js para que haga la autenticacion
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(), // .trim se usa para quitar espacios demas
          password: pwd.trim(),
        }),
      });

      // Se guarda la respuesta en js
      const data = await res.json();
      // Mostramos el error si la respuesta regresa error 
      if (!res.ok) {
        return Alert.alert('Error', data.error || 'No se pudo iniciar sesión.');
      }
      const role = data.user?.role;
      // Aqui se checa si el usuario tiene rol de admin o de usuario (El rol lo asignamos manualmente nosotros, el predeterminado
      // es user)
      if (role === 'admin') {
        router.replace('/adminMapView');
      } else {
        // cualquier otro rol se va a la vista normal
        router.replace('/mapView');
      }
      // Se hace un catch de algun posible error de conexion
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
