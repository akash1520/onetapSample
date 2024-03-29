import { useEffect } from 'react'
import { Title } from 'components/Title/Title'
import { Feed } from 'components/Feed'
import { RootReducer } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import './DesktopWindow.module.css'
import { DesktopHeader } from './DesktopHeader'

const DesktopWindow = () => {
  const { event, info, error } = useSelector((state: RootReducer) => state.background)

  useEffect(() => {
    console.info(
      '[🐺 overwolf-modern-react-boilerplate][🧰 InGameWindow][🔧 useEffect - event]',
      JSON.stringify(event, null, 2),
    )
    // or use https://github.com/AlbericoD/overwolf-modern-react-boilerplate#-remote-redux-debug
  }, [event])

  useEffect(() => {
    console.info(
      '[🐺 overwolf-modern-react-boilerplate][🧰 InGameWindow][🔧 useEffect -info]',
      JSON.stringify(info, null, 2),
    )
    // or use https://github.com/AlbericoD/overwolf-modern-react-boilerplate#-remote-redux-debug
  }, [info])

  return (
    <div className="in-game-container">
      <DesktopHeader/>
      <Title color="white">Desktop Game Window</Title>
      <Feed
        title="Events"
        data={event.length ? event[0] : { content: 'No events yet' }}
      />
      <Feed
        title="Infos"
        data={Object.keys(info).length ? info : { content: 'No infos yet' }}
      />
      <div className='errorClass'>Error: {error}</div>
    </div>
  )
}

export default DesktopWindow
