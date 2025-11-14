import React, { useState } from 'react';
import { router, Link, usePathname } from 'expo-router';
import { Pressable} from 'react-native';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radius } from '../theme/radius';
import { typography } from '../theme/typography';
import Screen from '../components/ui/Screen';


export default function mapView() {
  const pathname = usePathname();
    return(
        <Screen>
            <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Pressable onPress={() => router.push('/profileView')} hitSlop={12}>
                                <View style={styles.avatarPlaceholder} />
                                </Pressable>
                            <View style={styles.tabs}>
                              <Link
                                href="/reports"
                                style={[
                                styles.tabUnselect,
                                pathname?.includes('/reports') ? styles.activeTab : undefined,
                                ]}
                                >
                                  Reportes
                                </Link>
                              <Link
                                href="/mapView"
                                style={[
                                styles.tabUnselect,
                                pathname?.includes('/MapView') ? styles.activeTab : undefined,
                                ]}
                                >
                                  Mapa
                                </Link>
                                <Link
                                  href="/mapView"
                                  style={[
                                  styles.tabUnselect,
                                  pathname?.includes('/adminAnalitics') ? styles.activeTab : undefined,
                                  ]}
                                >
                                  Analiticas
                                </Link>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Plazas Totales</Text>
                            <Text style={styles.description}>100</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Plazas Ocupadas</Text>
                            <Text style={styles.description}>88</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Sensores con fallas</Text>
                            <Text style={styles.description}>1</Text>
                        </View>
                        <View style={styles.card}>
                            <Text style={styles.title}>Alertas del día</Text>
                            <Text style={styles.description}>4</Text>
                        </View>
                        <View style={styles.canvas} />
                        <Image
                            source={require('../assets/logo-estacionatec.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                  </ScrollView>
            
        </Screen>
    )

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    width: '100%',
  },
    view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    position: 'relative',
  },
  tabs: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -60 }], 
    flexDirection: 'row',
    gap: spacing.lg,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,  
    borderWidth: 1,
    borderColor: colors.divider,      
  },
  tabSelect: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingBottom: 2,
  },
  tabUnselect: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.divider,
    paddingBottom: 2,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: colors.primary, 
    color: colors.primary,       
  },
  card:{
    width: '90%',
    minHeight: 60,
    padding: spacing.xl,
    borderRadius: radius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 6},
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xl,
  },
  canvas:{
    width: '80%',
    minHeight: 200,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xl,
  },
  logo: {
    width: 80,
    height: 50,
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  title: {
    ...typography.body,
    color: colors.text,
    textAlign: 'left',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.text,                
    marginBottom: spacing.xs,    
    textAlign: 'left',          
  },
})