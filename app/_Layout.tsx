// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        {/* contentStyle yerine dış sarmalayıcı View'da arka plan rengi */}
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              // !!! DİKKAT: contentStyle burada artık YOK !!!
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen
              name="producer/[id]"
              options={{ headerShown: true, title: 'Producer' }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', headerShown: true, title: 'Modal' }}
            />
            <Stack.Screen
              name="+not-found"
              options={{ headerShown: true, title: 'Not Found' }}
            />
          </Stack>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
