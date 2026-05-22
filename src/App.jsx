import { useState, useEffect } from 'react'
import MapView from './components/MapView'
import SidePanel from './components/SidePanel'
import SplashScreen from './components/SplashScreen'

const SPLASH_KEY = 'loveeti-splash-skipped'

export default function App() {
  const [locations, setLocations] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem(SPLASH_KEY) !== '1'
  })

  const handleSkipSplash = () => {
    sessionStorage.setItem(SPLASH_KEY, '1')
    setShowSplash(false)
  }

  if (showSplash) {
    return <SplashScreen onSkip={handleSkipSplash} />
  }

  useEffect(() => {
    fetch('/data/locations.json')
      .then(res => res.json())
      .then(data => {
        setLocations(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSelect = (loc) => setSelected(loc)
  const handleClose = () => setSelected(null)

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f5f3ef]">
        <p className="text-stone-400 text-sm tracking-widest font-serif">大运河文化地图</p>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <MapView locations={locations} selected={selected} onSelect={handleSelect} />
      <SidePanel location={selected} onClose={handleClose} />
    </div>
  )
}
