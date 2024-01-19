import { useEffect, useState, Suspense } from 'react';
import { createClient } from '@supabase/supabase-js'
import { CurrentPage } from './CurrentPage'
import { Loading } from 'components/Loading'
import { WINDOW_NAMES } from './constants'
import { getCurrentWindow } from 'utils'
import './App.css'

const supabase_url = "https://ullmkehpatobgmwxzlah.supabase.co"
const supabase_key ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbG1rZWhwYXRvYmdtd3h6bGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1ODA5NTksImV4cCI6MjAyMTE1Njk1OX0.M_h2KO61YHgSpUtYILt-rzV6XheAjE70AFJ8wVNR-So"
export const supabase = createClient(supabase_url,supabase_key)

//This is the main component of the app, it is the root of the app
//each Page component is rendered in a different window
//if NODE_ENV is set to development, the app will render in a window named 'dev'
export const App = () => {
  const [page, setPage] = useState<string>('')

  useEffect(() => {
    async function preLoad() {
      if (process.env.NODE_ENV === 'development') {
        //you can set the current window to dev if you want to see the dev page <Normal Browser>
        setPage(WINDOW_NAMES.DESKTOP)
      } else {
        const currentWindow = await getCurrentWindow()
        setPage(currentWindow)
        console.info(
          '[🐺 overwolf-modern-react-boilerplate][🧰 src/app/App.tsx][🔧 useEffect - preLoad]',
          JSON.stringify({ currentWindow }, null, 2),
        )
      }
    }
    preLoad()
  }, [])
  //this is fallback for the loading current screen
  return (
    <Suspense fallback={<Loading />}>
      <CurrentPage page={page} />
    </Suspense>
  )
}
