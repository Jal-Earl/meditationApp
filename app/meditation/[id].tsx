import { Ionicons } from '@expo/vector-icons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Share, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '@/context/app-context';
import { meditationTechniques } from '@/data/meditations';

export default function MeditationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser, favorites, toggleFavorite, theme } = useAppContext();

  const isDark = theme === 'dark';

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  const item = meditationTechniques.find((technique) => technique.id === id);

  if (!item) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
        <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={[styles.title, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Technique not found</Text>
          <Pressable style={styles.primaryButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.primaryButtonText}>Go Home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.includes(item.id);

  const onShare = async () => {
    await Share.share({
      message: `Check this meditation: ${item.title}`,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={styles.imagePlaceholder}>[image]</Text>
          <Text style={[styles.title, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>{item.title}</Text>
          <Text style={[styles.description, { color: isDark ? '#94A3B8' : '#475569' }]}>{item.description}</Text>
          <Text style={[styles.duration, { color: isDark ? '#CBD5E1' : '#334155' }]}>Duration: {item.duration}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>About</Text>
          <Text style={[styles.description, { color: isDark ? '#CBD5E1' : '#334155' }]}>{item.about}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Instructions</Text>
          {item.instructions.map((step, index) => (
            <Text key={step} style={[styles.step, { color: isDark ? '#CBD5E1' : '#334155' }]}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        <View style={styles.bottomActions}>
          <Pressable style={styles.primaryButton} onPress={() => toggleFavorite(item.id)}>
            <View style={styles.favoriteRow}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Add to Favorites</Text>
            </View>
          </Pressable>

          <View style={styles.sideActions}>
            <Pressable style={styles.secondaryButton} onPress={() => router.replace('/(tabs)')}>
              <Text style={styles.secondaryText}>Back Home</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={onShare}>
              <Text style={styles.secondaryText}>Share</Text>
            </Pressable>
          </View>
        </View>
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
    paddingVertical: 20,
    color: '#64748B',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  duration: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 3,
  },
  step: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomActions: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sideActions: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#334155',
    fontWeight: '600',
  },
});
