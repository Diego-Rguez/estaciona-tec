import { StatusBar, StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography } from './typography';

export const adminAnalyticsStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    width: '100%',
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
  card: {
    width: '90%',
    minHeight: 60,
    padding: spacing.xl,
    borderRadius: radius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xl,
  },
  canvas: {
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
    link: {
    color: colors.primaryDark,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  button: {
    width: '65%',
    marginTop: spacing.xl,
    padding: spacing.md,
    alignSelf: 'center',
  },
  button2: {
    width: '65%',
    marginTop: spacing.xs,
    padding: spacing.md,
    alignSelf: 'center',
  },
  reportItem: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.divider,
  },
  reportTitle: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  reportDescription: {
    ...typography.caption,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  reportMeta: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
 leyendas: {
    width: 320,
    height: 60,
    alignSelf: 'center',
    marginTop: 0,
 },
 screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    letterSpacing: 0.5,
},


});

export const loginStyles = StyleSheet.create({
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
})

export const mapViewStyles = StyleSheet.create ({
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
  canvas: {
    width: '90%',
    minHeight: 380,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xxl,
  },
  mascot: {
    width: 160,
    height: 160,
    marginTop: spacing.xxl,
  },
  logo: {
    width: 110,
    height: 40,
    marginBottom: spacing.xxl,
  },  
 leyendas: {
    width: 320,
    height: 60,
    alignSelf: 'center',
    marginTop: 0,
 }
})

export const profileViewStyles = StyleSheet.create ({
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
})

export const registerStyles = StyleSheet.create ({
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
  helper: {
    marginTop: spacing.lg,
    color: colors.muted,
  },
  link: {
    color: colors.primaryDark,
    fontWeight: '600',
    textDecorationLine: 'underline',
  }, 
})

export const reportsStyles = StyleSheet.create ({
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
  card: {
    width: '90%',
    minHeight: 380,
    padding: spacing.lg,
    borderRadius: radius.xl,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.xxl,
  },
  mascot: {
    width: 120,
    height: 120,
    marginTop: spacing.xs,
  },
  logo: {
    width: 110,
    height: 40,
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.hG,
    color: colors.text,
    textAlign: 'left',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 22,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    marginTop: spacing.sm,
    padding: spacing.md,
    alignSelf: 'center',
  },
  textArea2: {
    height: 140,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.md,
  },  

  textArea1: {
    height: 45,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: spacing.md,
  }, 
})


export const parkingMapStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    aspectRatio: 1200 / 800, 
    position: 'relative',
    marginTop: 20,
  },
  spot: {
    position: 'absolute',
    width: 45,
    height: 92,
    borderRadius: 4,
    opacity: 0.5,
  },
});

export const layoutStyles = StyleSheet.create({
  badBanner: {
    position: "absolute",
    top: 40,           // ajusta según notch / status bar
    left: 16,
    right: 16,
    zIndex: 999,
    backgroundColor: "#FFE8E8",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  badBannerText: {
    flex: 1,
    color: "#B00020",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 12,
  },
  badBannerButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#0071CE",
    borderRadius: 12,
  },
  badBannerButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
