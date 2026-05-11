import React from 'react';
import { View, ViewProps, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../../config/theme';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withSafeArea?: boolean;
  paddingHorizontal?: keyof typeof theme.spacing;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  withSafeArea = true,
  paddingHorizontal = 4, // 16px by default based on theme
  style,
  ...props
}) => {
  const Container = withSafeArea ? SafeAreaView : View;
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: theme.spacing[paddingHorizontal] },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.content,
        { paddingHorizontal: theme.spacing[paddingHorizontal] },
      ]}
    >
      {children}
    </View>
  );

  return (
    <Container style={[styles.container, style]} {...props}>
      {content}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});