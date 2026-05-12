export type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Weekly Goals',
    content: 'Finish the React Native assignment, review PRs, write unit tests for the auth module, update the design docs...',
    date: '2026-05-12T08:00:00.000Z',
  },
  {
    id: '2',
    title: 'Grocery List',
    content: 'Apples, oat milk, sourdough bread, eggs, Greek yogurt, olive oil, cherry tomatoes, pasta, parmesan...',
    date: '2026-05-11T14:22:00.000Z',
  },
  {
    id: '3',
    title: 'Book Recommendations',
    content: 'The Pragmatic Programmer, Clean Code, Designing Data-Intensive Applications, A Philosophy of Software Design...',
    date: '2026-05-10T19:45:00.000Z',
  },
  {
    id: '4',
    title: 'Meeting Notes – Design Sync',
    content: 'Discussed spacing system migration to 8-point grid. Action items: update Figma tokens, align with engineering on component library...',
    date: '2026-05-09T11:00:00.000Z',
  },
  {
    id: '5',
    title: 'Travel Ideas',
    content: 'Japan in spring for cherry blossoms. Portugal for cost of living and good weather. Iceland for northern lights in winter...',
    date: '2026-05-08T20:10:00.000Z',
  },
  {
    id: '6',
    title: 'Workout Log',
    content: 'Monday: upper body 45 min. Wednesday: run 5km in 28min. Friday: yoga and mobility work. Weekend: morning hike...',
    date: '2026-05-07T07:30:00.000Z',
  },
  {
    id: '7',
    title: 'Side Project Ideas',
    content: 'A habit tracker with streaks. An offline recipe app. A CLI tool for managing dev environments. A personal finance tracker...',
    date: '2026-05-06T22:00:00.000Z',
  },
  {
    id: '8',
    title: 'Reading Notes – Clean Code',
    content: 'Functions should do one thing. Name functions for what they do, not how. Avoid boolean parameters that split function behavior...',
    date: '2026-05-05T16:15:00.000Z',
  },
];
