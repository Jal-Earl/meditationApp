import { Redirect } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '@/context/app-context';

const upcomingDates = Array.from({ length: 14 }).map((_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return date.toISOString().slice(0, 10);
});

export default function RemindersScreen() {
  const { currentUser, reminders, addReminder, removeReminder, theme } = useAppContext();
  const isDark = theme === 'dark';

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Pick a Date</Text>
          <View style={styles.calendarGrid}>
            {upcomingDates.map((date) => (
              <Pressable key={date} style={styles.dateButton} onPress={() => addReminder(date)}>
                <Text style={styles.dateText}>{date}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[styles.note, { color: isDark ? '#94A3B8' : '#64748B' }]}>Tap any date to schedule a reminder.</Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFFFFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Set Reminders</Text>
          {reminders.length === 0 ? (
            <Text style={[styles.note, { color: isDark ? '#94A3B8' : '#64748B' }]}>No reminders set yet.</Text>
          ) : (
            reminders.map((date) => (
              <View key={date} style={styles.reminderRow}>
                <Text style={[styles.reminderDate, { color: isDark ? '#CBD5E1' : '#1E293B' }]}>{date}</Text>
                <Pressable style={styles.removeButton} onPress={() => removeReminder(date)}>
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
              </View>
            ))
          )}
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
    paddingBottom: 26,
  },
  card: {
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  calendarGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  dateButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  note: {
    fontSize: 13,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  reminderDate: {
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  removeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
