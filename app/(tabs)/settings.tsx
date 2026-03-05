import { Redirect, router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

import { useAppContext } from '@/context/app-context';

export default function SettingsScreen() {
  const { currentUser, theme, toggleTheme, logoutUser } = useAppContext();
  const isDark = theme === 'dark';

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  const onLogout = async () => {
    await logoutUser();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
        <Text style={[styles.title, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Theme</Text>
        <View style={styles.row}>
          <Text style={[styles.text, { color: isDark ? '#CBD5E1' : '#334155' }]}>Dark Mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
