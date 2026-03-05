import { Redirect } from 'expo-router';

import { useAppContext } from '@/context/app-context';

export default function Index() {
  const { loading, currentUser } = useAppContext();

  if (loading) {
    return null;
  }

  if (!currentUser) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}
