import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Notes from '../pages/Notes'
import NoteForm from '../features/notes/components/NoteForm'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'notes',
        children: [
          {
            index: true,
            element: <Notes />,
          },

          {
            path: 'new',
            element: <NoteForm />,
          },
        ],
      },

      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
])