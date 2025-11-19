import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Screen from '../components/ui/Screen';
import { registerStyles as styles } from '../theme/styles'; 

export default function RegisterScreen() {
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require('../assets/logo-estacionatec.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={styles.title}>Registro</Text>

        {/* Inputs */}
        <View style={styles.form}>
          <Input placeholder="Correo Institucional" keyboardType="email-address" autoCapitalize="none" />
          <Input placeholder="Nombre Completo..." />
          <Input placeholder="Contraseña" secureTextEntry />
        </View>

        {/* Botón */}
        <Button title="Continuar" onPress={() => {}} style={styles.button} />

        {/* Mascota */}
        <Image
          source={require('../assets/borregoSaluda.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </ScrollView>
    </Screen>
  );
}
