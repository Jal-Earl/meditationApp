import { Link, Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useAppContext } from '@/context/app-context';

export default function RegisterScreen() {
  const { currentUser, registerUser, theme } = useAppContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isDark = theme === 'dark';

  if (currentUser) {
    return <Redirect href="/(tabs)" />;
  }

  const onRegister = async () => {
    setError('');
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please complete username, email, and password.');
      return;
    }

    await registerUser({
      username: username.trim(),
      email: email.trim(),
      password,
    });

    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#475569' }]}>Register with your details to get started.</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              color: isDark ? '#E2E8F0' : '#0F172A',
              borderColor: isDark ? '#334155' : '#CBD5E1',
            },
          ]}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              color: isDark ? '#E2E8F0' : '#0F172A',
              borderColor: isDark ? '#334155' : '#CBD5E1',
            },
          ]}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              color: isDark ? '#E2E8F0' : '#0F172A',
              borderColor: isDark ? '#334155' : '#CBD5E1',
            },
          ]}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.primaryButton} onPress={onRegister}>
          <Text style={styles.primaryButtonText}>Register</Text>
        </Pressable>

        <Link href="/login" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Back to login</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    color: '#DC2626',
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#94A3B8',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
});
