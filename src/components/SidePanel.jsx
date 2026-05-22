export default function SidePanel({ location, onClose }) {
  const isOpen = location !== null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-colors duration-500 pointer-events-none ${
          isOpen ? 'pointer-events-auto' : ''
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[420px] max-w-[90vw] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col bg-white/80 backdrop-blur-2xl border-r border-black/5 shadow-[4px_0_40px_rgba(0,0,0,0.06)]">
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-4">
            <span className="text-xs tracking-[0.2em] text-stone-400 uppercase font-serif">
              {location?.category || '地点详情'}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content */}
          {location && (
            <div className="flex-1 overflow-y-auto px-8 pb-12 panel-scroll">
              {/* Location name */}
              <h1 className="text-3xl font-serif font-semibold text-stone-900 tracking-wider mb-1">
                {location.name}
              </h1>
              <p className="text-sm text-stone-400 font-serif mb-8">
                {location.city} · {location.dynasty}
              </p>

              {/* Summary */}
              <p className="text-lg text-stone-600 font-serif leading-relaxed mb-6 italic border-l-2 border-stone-200 pl-4">
                {location.summary}
              </p>

              {/* Description */}
              <p className="text-sm text-stone-500 font-serif leading-loose text-justify mb-10">
                {location.description}
              </p>

              {/* Poem section */}
              {location.poem && (
                <div className="border-t border-stone-100 pt-8 mb-8">
                  <span className="text-xs tracking-[0.3em] text-stone-300 uppercase font-serif">
                    诗词
                  </span>
                  <h3 className="text-lg font-serif font-medium text-stone-800 mt-3 mb-1">
                    {location.poem.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-serif mb-4">
                    {location.poem.author}
                  </p>
                  <div className="bg-stone-50/80 rounded-lg p-5 font-serif text-sm text-stone-600 leading-loose whitespace-pre-line border border-stone-100">
                    {location.poem.content}
                  </div>
                  {location.poem.notes && (
                    <p className="text-xs text-stone-400 font-serif mt-3 leading-relaxed">
                      {location.poem.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Audio player placeholder */}
              {location.audioSrc && (
                <div className="border-t border-stone-100 pt-8">
                  <span className="text-xs tracking-[0.3em] text-stone-300 uppercase font-serif">
                    音频
                  </span>
                  <audio controls className="w-full mt-3" src={location.audioSrc}>
                    您的浏览器不支持音频播放
                  </audio>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
