import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';
import { adminAnalyticsStyles as styles } from '../theme/styles';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/users`;

export default function AssignAdmin() {
  const [email, setEmail] = useState("");

  const handleMakeAdmin = async () => {
    if (!email.trim()) {
      return Alert.alert("Error", "Debes ingresar un correo.");
    }

    try {
      const res = await fetch(`${API_URL}/${email}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role: "admin" })
      });

      const data = await res.json();

      if (!res.ok) {
        return Alert.alert("Error", data.error || "No se pudo actualizar el rol.");
      }

      Alert.alert("Listo", "El usuario ahora es administrador.");
      router.back(); // Regresar a adminAnalitics

    } catch (error) {
      console.log("ERROR:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => router.push('/profileView')} hitSlop={12}>
              <View style={styles.avatarPlaceholder} />
            </Pressable>
          </View>        

        <Text style={styles.title}>Asignar Rol Admin</Text>
        <TextInput
          placeholder="Correo del usuario"
          placeholderTextColor="#888"
          style={{
            width: "85%",
            padding: 12,
            borderRadius: 12,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#E0E0E0",
            marginBottom: 20,
            color: "black",
            marginTop: 30,
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />

        <Button 
          title="Convertir a Admin"
          onPress={handleMakeAdmin}
          style={styles.button}
        />
        <Button 
            title="Regresar" 
            onPress={() => router.push('/adminAnalitics')} 
            style={styles.button} 
          />

        <Image
          source={require('../assets/logo-estacionatec.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </Screen>
  );
}
