import { Link, Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAppContext } from '@/context/app-context';

export default function LoginScreen() {
  const { loading, currentUser, loginUser, theme } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isDark = theme === 'dark';

  if (loading) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
        <ActivityIndicator size="large" color={isDark ? '#E2E8F0' : '#1E293B'} />
      </SafeAreaView>
    );
  }

  if (currentUser) {
    return <Redirect href="/(tabs)" />;
  }

  const onLogin = async () => {
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.');
      return;
    }

    const success = await loginUser(username, password);
    if (!success) {
      setError('Invalid credentials or no registered account found.');
      return;
    }

    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }]}>
      <View style={styles.inner}>
        <Text style={[styles.title, { color: isDark ? '#E2E8F0' : '#0F172A' }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: isDark ? '#94A3B8' : '#475569' }]}>Login to continue your meditation journey.</Text>

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
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          secureTextEntry
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

        <Pressable style={styles.primaryButton} onPress={onLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>

        <Link href="/register" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Create an account</Text>
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
