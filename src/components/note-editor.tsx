import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { type Note } from '@/data/notes';

type Props = {
  note?: Note;
  onBack: () => void;
  onSave: (title: string, content: string) => void;
};

export function NoteEditor({ note, onBack, onSave }: Props) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [body, setBody] = useState(note?.content ?? '');
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const contentMaxWidth = width > 600 ? 600 : undefined;

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground
          source={require('@/assets/images/logo-glow.png')}
          style={styles.headerBg}
          resizeMode="cover"
        >
          <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
            <ThemedView style={styles.headerControls}>
              <Pressable
                onPress={onBack}
                style={({ pressed }) =>
                  StyleSheet.flatten([styles.button, styles.backButton, pressed && styles.buttonPressed])
                }
              >
                <ThemedText type="smallBold">← Back</ThemedText>
              </Pressable>

              <Pressable
                onPress={() => onSave(title, body)}
                style={({ pressed }) =>
                  StyleSheet.flatten([styles.button, styles.saveButton, pressed && styles.buttonPressed])
                }
              >
                <ThemedText type="smallBold" style={styles.saveLabel}>
                  Save
                </ThemedText>
              </Pressable>
            </ThemedView>
          </SafeAreaView>
        </ImageBackground>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            contentMaxWidth !== undefined && {
              maxWidth: contentMaxWidth,
              alignSelf: 'center' as const,
              width: '100%' as const,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={StyleSheet.flatten([styles.titleInput, { color: theme.text }])}
            placeholder="Note title"
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />

          <ThemedView type="backgroundElement" style={styles.divider} />

          <TextInput
            style={StyleSheet.flatten([styles.bodyInput, { color: theme.text }])}
            placeholder="Start writing..."
            placeholderTextColor={theme.textSecondary}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  headerBg: {
    width: '100%',
    justifyContent: 'flex-end',
    height: 120,
  },
  headerSafeArea: {
    width: '100%',
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    paddingTop: Spacing.two,
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  saveButton: {
    backgroundColor: '#208AEF',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  saveLabel: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.three,
    gap: Spacing.three,
    flexGrow: 1,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    paddingVertical: Spacing.two,
  },
  divider: {
    height: 1,
    borderRadius: 1,
  },
  bodyInput: {
    fontSize: 16,
    lineHeight: 26,
    minHeight: 300,
    paddingTop: Spacing.two,
  },
});
