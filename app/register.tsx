import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Alert } from 'react-native';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Screen from '../components/ui/Screen';
import { registerStyles as styles } from '../theme/styles'; 
import { router, Link } from 'expo-router';
import { API_BASE_URL } from '../config/api';


const API_URL = `${API_BASE_URL}/auth/register`;

export default function RegisterScreen() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !name || !password) {
      return Alert.alert("Error", "Todos los campos son obligatorios.");
    }
   try {
    //Le mandamos en formato js lo que el usuario ingrese
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          password: password.trim(),
        }),
      });
      // .trim se usa para quitar espacios demas

      // Guardamos la respuesta en js
      const data = await res.json();

      // Si la respuesta es algun error se indica
      if (!res.ok) {
        return Alert.alert("Error", data.error || "No se pudo registrar.");
      }
      // Si todo salio bien se redirige al login
      Alert.alert("Listo", "Registro exitoso.");
      router.push("/login");

      // Se hace un catch de algun posible error de conexion
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor.");
      console.log("REGISTER ERROR:", error);
    }
  };  
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <Image
          source={require('../assets/logo-estacionatec.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Registro</Text>

        <View style={styles.form}>
          <Input
            placeholder="Correo Institucional"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Nombre Completo..."
            value={name}
            onChangeText={setName}
          />

          <Input
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          title="Continuar"
          onPress={handleRegister}
          style={styles.button}
        />
          {/* Link a Registro */}
          <Text style={styles.helper}>
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" style={styles.link}>
              Inicia Sesión
            </Link>
          </Text>        

        <Image
          source={require('../assets/borregoSaluda.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      
      </ScrollView>
    </Screen>
  );
}