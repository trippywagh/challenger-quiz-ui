"use client"

interface ChapterLandingProps {
  onStartChallenge: (mode: "friend" | "bot") => void
}

export default function ChapterLanding({ onStartChallenge }: ChapterLandingProps) {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen relative flex flex-col pb-10 overflow-x-hidden custom-scroll bg-[#050505] text-white font-sans antialiased selection:bg-[#1D6DED]/30">
      {/* Hero */}
      <div className="relative z-0 h-[480px] w-full overflow-hidden shrink-0">
        <img
          alt="Mathematical patterns background"
          className="w-full h-full object-cover"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/quadratic-hero.jpg`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-10">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
          >
            <span className="material-icons-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
            >
              <span className="material-icons-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 px-6 text-center">
          <p className="text-[12px] uppercase tracking-widest text-white/60 mb-3 font-medium">
            Chapter 2 | Algebra
          </p>
          <h1 className="font-display text-[40px] leading-none mb-3 gold-gradient-text tracking-wide drop-shadow-2xl">
            QUADRATIC
            <br />
            EQUATIONS
          </h1>
          <p className="text-white/80 text-sm font-medium">
            Algebra: Roots and Formulas
          </p>
        </div>
      </div>

      {/* Content - above hero with solid background so nothing overlays */}
      <div className="relative z-10 px-6 space-y-8 -mt-4 bg-[#050505]">
        <div className="space-y-6">
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 min-w-0 h-2 rounded-full progress-bar-bg overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[20%]" />
            </div>
            <span className="text-sm font-semibold text-white/70 shrink-0 w-8 text-right">20%</span>
          </div>
          <button
            type="button"
            className="w-full bg-[#1D6DED] hover:bg-[#1D6DED]/90 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
          >
            Resume Learning
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl glossy-card transition-colors hover:bg-white/10"
          >
            <span className="material-icons-outlined text-white/60">menu_book</span>
            <span className="text-[12px] font-medium text-white/60">Watch</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl glossy-card transition-colors hover:bg-white/10"
          >
            <span className="material-icons-outlined text-white/60">school</span>
            <span className="text-[12px] font-medium text-white/60">Learn</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-white/10"
          >
            <span className="material-icons-outlined text-white">workspace_premium</span>
            <span className="text-[12px] font-bold text-white">Ace</span>
          </button>
        </div>

        {/* Quadratic Clash */}
        <div className="rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/30 via-transparent to-purple-500/30">
          <div className="bg-[#0A0F1E] rounded-[23px] p-6 border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <span className="material-icons-outlined text-blue-400">bolt</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Quadratic Clash
                </h3>
                <p className="text-[12px] text-blue-400/80 font-medium">
                  5 Qs | Win rewards
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Challenge a friend or AI to a quick 1v1 quadratic battle!
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => onStartChallenge("friend")}
                className="py-4 px-4 rounded-xl border border-white/10 bg-white/5 text-[13px] font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Challenge Friend
              </button>
              <button
                type="button"
                onClick={() => onStartChallenge("bot")}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-indigo-600 text-[13px] font-bold text-white glow-purple relative overflow-hidden group min-h-[52px]"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-tighter opacity-80 mb-[-2px]">
                    Boss Battle
                  </span>
                  <span>Equation-X</span>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* Challenge yourself & ACE */}
        <div className="rounded-3xl bg-[#1A0B0B] border border-red-900/20 p-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Challenge yourself & ACE
            </h3>
            <p className="text-sm text-white/50">15 Qs | 30 mins</p>
          </div>
          <button
            type="button"
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-slate-100 transition-colors shadow-xl"
          >
            Start Test
          </button>
        </div>

        {/* Additional Material */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10" />
            <h4 className="text-[11px] font-bold text-white/50 tracking-[0.2em] uppercase">
              Additional Material
            </h4>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl glossy-card hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                📝
              </div>
              <span className="text-sm font-semibold text-white/80">Notes</span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl glossy-card hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-xl">
                🎁
              </div>
              <span className="text-sm font-semibold text-white/80">
                Bonus Content
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-10" />
    </div>
  )
}
