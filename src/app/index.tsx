import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NoteEditor } from '@/components/note-editor';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { MOCK_NOTES, type Note } from '@/data/notes';
import { useColorSchemePreference } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

type AppView = 'list' | 'editor';

function NoteCard({ note, onPress }: { note: Note; onPress: () => void }) {
  const formattedDate = new Date(note.date).toLocaleDateString();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => StyleSheet.compose(styles.card, pressed && styles.cardPressed)}
    >
      <ThemedView type="backgroundElement" style={styles.cardInner}>
        <ThemedView type="backgroundElement" style={styles.cardTopRow}>
          <ThemedText type="smallBold" numberOfLines={1} style={styles.cardTitle}>
            {note.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {formattedDate}
          </ThemedText>
        </ThemedView>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {note.content}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [view, setView] = useState<AppView>('list');
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const { colorScheme, toggleColorScheme } = useColorSchemePreference();
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const isWide = width > 600;

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [notes, searchQuery],
  );

  function openNote(note: Note) {
    setSelectedNote(note);
    setView('editor');
  }

  function openNewNote() {
    setSelectedNote(undefined);
    setView('editor');
  }

  function goBack() {
    setSelectedNote(undefined);
    setView('list');
  }

  function handleSave(title: string, content: string) {
    if (selectedNote) {
      setNotes((prev) =>
        prev.map((n) => (n.id === selectedNote.id ? { ...n, title, content } : n)),
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim() || 'Untitled',
        content,
        date: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
    }
    goBack();
  }

  if (view === 'editor') {
    return <NoteEditor note={selectedNote} onBack={goBack} onSave={handleSave} />;
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={[styles.safeArea, isWide && styles.safeAreaWide]}>
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle">Notes</ThemedText>
          <ThemedView style={styles.headerRight}>
            <Pressable
              onPress={openNewNote}
              style={({ pressed }) =>
                StyleSheet.flatten([styles.addButton, pressed && styles.addButtonPressed])
              }
            >
              <ThemedText type="smallBold" style={styles.addButtonLabel}>
                +
              </ThemedText>
            </Pressable>
            <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
          </ThemedView>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.searchContainer}>
          <TextInput
            style={StyleSheet.compose(styles.searchInput, { color: theme.text })}
            placeholder="Search notes..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </ThemedView>

        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NoteCard note={item} onPress={() => openNote(item)} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ThemedText themeColor="textSecondary" style={styles.emptyText}>
              No notes match your search.
            </ThemedText>
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
  },
  safeAreaWide: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  addButton: {
    backgroundColor: '#208AEF',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonLabel: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 24,
  },
  searchContainer: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    marginBottom: Spacing.three,
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: Spacing.two,
  },
  listContent: {
    gap: Spacing.two,
    paddingBottom: Spacing.five,
  },
  card: {
    borderRadius: Spacing.two,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardInner: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  cardTitle: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Spacing.five,
  },
});
