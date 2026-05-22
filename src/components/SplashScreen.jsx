import { useState, useEffect } from 'react'

export default function SplashScreen({ onSkip }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data === 'skip-splash') {
        setVisible(false)
        onSkip()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onSkip])

  if (!visible) return null

  const handleSkip = () => {
    setVisible(false)
    onSkip()
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <iframe
        src="/presentation.html"
        title="项目介绍"
        className="w-full h-full border-0"
        allowFullScreen
      />
      {/* Skip button — overlays at bottom-right, outside iframe */}
      <button
        onClick={handleSkip}
        className="fixed bottom-6 right-6 z-[10000] px-5 py-2.5
                   bg-[#141820]/90 backdrop-blur-sm
                   border border-[#C9A84C]/40 hover:border-[#C9A84C]
                   text-[#C9A84C] hover:text-white
                   font-['Noto_Sans_SC',sans-serif] text-sm tracking-widest
                   rounded-full cursor-pointer
                   transition-all duration-300
                   hover:bg-[#C9A84C]/20 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]
                   active:scale-95"
        style={{ fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}
      >
        Skip →
      </button>
    </div>
  )
}
