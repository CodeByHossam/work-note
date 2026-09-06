const notes = [
  {
    _id: 'n1',
    title: 'Design landing page',
    description:
      'Create a modern landing page for the marketing site with a hero section, features grid, and a call-to-action banner.',
    state: 'completed',
    creator: { _id: 'u1', name: 'Ahmed Hassan' },
    assignedTo: { _id: 'u2', name: 'Sara Mostafa' },
    createdAt: '2025-08-01T10:00:00.000Z',
  },
  {
    _id: 'n2',
    title: 'Fix login validation',
    description:
      'Update the login form to show inline validation errors for empty fields and invalid email format.',
    state: 'started',
    creator: { _id: 'u1', name: 'Ahmed Hassan' },
    assignedTo: { _id: 'u3', name: 'Omar Khaled' },
    createdAt: '2025-08-05T14:30:00.000Z',
  },
  {
    _id: 'n3',
    title: 'Write API documentation',
    description:
      'Document all note and user endpoints including request examples, response shapes, and error codes.',
    state: 'pending',
    creator: { _id: 'u6', name: 'Mariam Nour' },
    assignedTo: { _id: 'u4', name: 'Laila Ibrahim' },
    createdAt: '2025-08-10T09:15:00.000Z',
  },
  {
    _id: 'n4',
    title: 'Implement dark mode',
    description:
      'Add a theme toggle and persist the user preference in localStorage across the notes app.',
    state: 'started',
    creator: { _id: 'u1', name: 'Ahmed Hassan' },
    assignedTo: { _id: 'u5', name: 'Youssef Adel' },
    createdAt: '2025-08-14T11:20:00.000Z',
  },
  {
    _id: 'n5',
    title: 'Optimize list queries',
    description:
      'Add pagination and select projections to speed up the note list endpoint under heavy load.',
    state: 'pending',
    creator: { _id: 'u6', name: 'Mariam Nour' },
    assignedTo: { _id: 'u2', name: 'Sara Mostafa' },
    createdAt: '2025-08-20T16:45:00.000Z',
  },
  {
    _id: 'n6',
    title: 'Set up CI pipeline',
    description:
      'Configure automated linting, formatting checks, and unit tests to run on every pull request.',
    state: 'completed',
    creator: { _id: 'u1', name: 'Ahmed Hassan' },
    assignedTo: { _id: 'u3', name: 'Omar Khaled' },
    createdAt: '2025-08-25T08:50:00.000Z',
  },
];

export default notes;