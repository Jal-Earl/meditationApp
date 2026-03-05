import { Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '@/context/app-context';
import { meditationTechniques } from '@/data/meditations';

export default function FavoritesScreen() {
  const { currentUser, favorites, toggleFavorite, theme } = useAppContext();
  const isDark = theme === 'dark';

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  const favoriteItems = meditationTechniques.filter((item) => favorites.includes(item.id));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {favoriteItems.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
            <Text style={[styles.emptyText, { color: isDark ? '#CBD5E1' : '#334155' }]}>No favorites yet. Add techniques from Home.</Text>
          </View>
        ) : (
          favoriteItems.map((item) => (
            <View key={item.id} style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
              <Text style={styles.imagePlaceholder}>[image]</Text>
              <Text style={[styles.title, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>{item.title}</Text>
              <Text style={[styles.description, { color: isDark ? '#94A3B8' : '#475569' }]}>{item.description}</Text>
              <View style={styles.actions}>
                <Pressable style={styles.button} onPress={() => router.push({ pathname: '/meditation/[id]', params: { id: item.id } })}>
                  <Text style={styles.buttonText}>Open</Text>
                </Pressable>
                <Pressable style={styles.heartAction} onPress={() => toggleFavorite(item.id)}>
                  <Ionicons name="heart" size={18} color="#DC2626" />
                  <Text style={[styles.heartText, { color: isDark ? '#CBD5E1' : '#334155' }]}>Add to favorites</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
    paddingBottom: 28,
  },
  emptyCard: {
    borderRadius: 14,
    padding: 20,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },
  card: {
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  imagePlaceholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#94A3B8',
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 18,
    color: '#64748B',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  heartAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heartText: {
    fontSize: 13,
  },
});
