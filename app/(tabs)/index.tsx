import { Ionicons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { Share, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '@/context/app-context';
import { meditationTechniques } from '@/data/meditations';

export default function HomeScreen() {
  const { currentUser, favorites, toggleFavorite, theme } = useAppContext();
  const isDark = theme === 'dark';

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  const featured = meditationTechniques[0];

  const onShare = async (title: string) => {
    await Share.share({
      message: `Try this meditation technique: ${title}`,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.logo, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>🧘ZenStart</Text>
          <Pressable onPress={() => router.push('/(tabs)/settings')}>
            <Ionicons name="settings-outline" size={24} color={isDark ? '#E2E8F0' : '#0F172A'} />
          </Pressable>
        </View>

        <Text style={[styles.greeting, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Hello, {currentUser.username}</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#475569' }]}>Started your meditation journey here</Text>

        <View style={[styles.featured, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Daily Featured Exercise</Text>
          <Text style={styles.imagePlaceholder}>[image]</Text>
          <Text style={[styles.cardTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>{featured.title}</Text>
          <Text style={[styles.cardDescription, { color: isDark ? '#94A3B8' : '#475569' }]}>{featured.description}</Text>
          <Text style={[styles.duration, { color: isDark ? '#CBD5E1' : '#334155' }]}>Duration: {featured.duration}</Text>
          <View style={styles.cardActions}>
            <Pressable style={styles.actionButton} onPress={() => router.push({ pathname: '/meditation/[id]', params: { id: featured.id } })}>
              <Text style={styles.actionText}>Open</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => onShare(featured.title)}>
              <Text style={styles.actionText}>Share</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Beginner Techniques</Text>
          <Pressable style={styles.reminderButton} onPress={() => router.push('/(tabs)/reminders')}>
            <Text style={styles.reminderButtonText}>Reminders</Text>
          </Pressable>
        </View>

        {meditationTechniques.map((item) => {
          const isFavorite = favorites.includes(item.id);
          return (
            <View key={item.id} style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
              <Text style={styles.imagePlaceholder}>[image]</Text>
              <Text style={[styles.cardTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>{item.title}</Text>
              <Text style={[styles.cardDescription, { color: isDark ? '#94A3B8' : '#475569' }]}>{item.description}</Text>
              <Text style={[styles.duration, { color: isDark ? '#CBD5E1' : '#334155' }]}>Duration: {item.duration}</Text>

              <View style={styles.cardActions}>
                <Pressable style={styles.actionButton} onPress={() => router.push({ pathname: '/meditation/[id]', params: { id: item.id } })}>
                  <Text style={styles.actionText}>View</Text>
                </Pressable>
                <Pressable style={styles.actionButton} onPress={() => onShare(item.title)}>
                  <Text style={styles.actionText}>Share</Text>
                </Pressable>
                <Pressable style={styles.favoriteAction} onPress={() => toggleFavorite(item.id)}>
                  <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color={isFavorite ? '#DC2626' : '#475569'} />
                  <Text style={[styles.favoriteText, { color: isDark ? '#CBD5E1' : '#334155' }]}>Add to favorites</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
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
    gap: 14,
    paddingBottom: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 16,
    fontWeight: '700',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: -6,
  },
  featured: {
    borderRadius: 14,
    padding: 14,
    gap: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  reminderButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  reminderButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  duration: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  favoriteAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 4,
  },
  favoriteText: {
    fontSize: 13,
  },
});
