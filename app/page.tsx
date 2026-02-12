"use client"

import { useState } from "react"
import ChapterLanding from "@/components/chapter-landing"
import ChallengerQuiz from "@/components/challenger-quiz"

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [challengeMode, setChallengeMode] = useState<"friend" | "bot" | null>(null)

  const handleStartChallenge = (mode: "friend" | "bot") => {
    setChallengeMode(mode)
    setShowQuiz(true)
  }

  const handleExitQuiz = () => {
    setShowQuiz(false)
    setChallengeMode(null)
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-start justify-center">
      {/* iPhone 17 Pro container - 402x874 aspect ratio */}
      <div className="w-full max-w-[402px] min-h-screen md:min-h-0 md:h-[874px] md:my-8 md:rounded-[3rem] md:border-[8px] md:border-neutral-800 md:shadow-2xl overflow-hidden relative bg-[#0a0a0f]">
        {/* Dynamic Island (visible on md+ screens) */}
        <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />
        
        {/* Content */}
        <div className="h-full overflow-y-auto">
          {showQuiz && challengeMode ? (
            <ChallengerQuiz mode={challengeMode} onExit={handleExitQuiz} />
          ) : (
            <ChapterLanding onStartChallenge={handleStartChallenge} />
          )}
        </div>
      </div>
    </div>
  )
}
