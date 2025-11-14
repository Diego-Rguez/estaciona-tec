import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Screen from '../components/ui/Screen';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  logo: {
    width: 220,
    height: 80,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  form: {
    width: '85%',
    marginBottom: spacing.lg,
  },
  button: {
    width: '85%',
    marginTop: spacing.sm,
  },
  mascot: {
    width: 250,
    height: 250,
    marginTop: spacing.xl,
  },
});
