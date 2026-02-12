"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Zap, Clock, Trophy, Star, ArrowRight, RotateCcw, HelpCircle, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChallengerQuizProps {
  mode: "friend" | "bot"
  onExit: () => void
  onScreenChange?: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the angle of incidence equal to?",
    options: ["Angle of refraction", "Angle of reflection", "90 degrees"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which mirror is used in car headlights?",
    options: ["Plane mirror", "Concave mirror", "Convex mirror"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Light travels fastest in which medium?",
    options: ["Water", "Glass", "Vacuum"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What causes a pencil to appear bent in water?",
    options: ["Reflection", "Refraction", "Diffraction"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "The splitting of white light into colors is called?",
    options: ["Dispersion", "Reflection", "Absorption"],
    correctAnswer: 0,
  },
]

const botName = "Equation-X"

export default function ChallengerQuiz({ mode, onExit, onScreenChange }: ChallengerQuizProps) {
  const [gameState, setGameState] = useState<"waiting" | "countdown" | "playing" | "result">("waiting")

  useEffect(() => {
    onScreenChange?.()
  }, [gameState, onScreenChange])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(10)
  const [showFeedback, setShowFeedback] = useState(false)
  const [playerAnsweredFirst, setPlayerAnsweredFirst] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [playerAnswers, setPlayerAnswers] = useState<boolean[]>([])

  // Countdown before game starts
  useEffect(() => {
    if (gameState === "countdown") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        return () => clearTimeout(timer)
      } else {
        setGameState("playing")
      }
    }
  }, [gameState, countdown])

  // Question timer
  useEffect(() => {
    if (gameState === "playing" && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing" && !showFeedback) {
      handleTimeout()
    }
  }, [gameState, timeLeft, showFeedback])

  const handleTimeout = useCallback(() => {
    setShowFeedback(true)
    setPlayerAnswers((prev) => [...prev, false])
    // Bot scores if player times out
    if (mode === "bot") {
      setOpponentScore((prev) => prev + 10)
    }
    setTimeout(() => {
      moveToNextQuestion()
    }, 1500)
  }, [mode])

  const startGame = () => {
    setGameState("countdown")
    setCountdown(3)
  }

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback || selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    setPlayerAnswers((prev) => [...prev, isCorrect])

    // Simulate bot answering slowly (3-6 seconds after player)
    const botDelay = mode === "bot" ? Math.random() * 3000 + 3000 : 0
    const playerAnsweredFirst = timeLeft > 4 // If player answered with more than 4 seconds left

    setPlayerAnsweredFirst(playerAnsweredFirst)

    if (isCorrect) {
      let points = 10
      if (playerAnsweredFirst) points += 5 // Speed bonus
      setPlayerScore((prev) => prev + points)
    }

    // Bot scoring (bot is designed to lose sometimes)
    if (mode === "bot") {
      setTimeout(() => {
        // Bot has 40% chance of getting it right
        const botCorrect = Math.random() < 0.4
        if (botCorrect) {
          setOpponentScore((prev) => prev + 10)
        }
      }, botDelay)
    }

    setTimeout(() => {
      moveToNextQuestion()
    }, 2000)
  }

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setTimeLeft(10)
      setPlayerAnsweredFirst(false)
    } else {
      setGameState("result")
    }
  }

  const resetGame = () => {
    setGameState("waiting")
    setCurrentQuestion(0)
    setPlayerScore(0)
    setOpponentScore(0)
    setSelectedAnswer(null)
    setTimeLeft(10)
    setShowFeedback(false)
    setPlayerAnsweredFirst(false)
    setCountdown(3)
    setPlayerAnswers([])
  }

  // Waiting Screen – Boss Battle / Challenge intro
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  if (gameState === "waiting") {
    if (mode === "bot") {
      return (
        <div className="min-h-0 bg-[#0A0118] text-white flex flex-col items-center overflow-hidden relative">
          <div className="fixed inset-0 grid-bg pointer-events-none opacity-40" />
          <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#0A0118]/50 to-[#0A0118] pointer-events-none" />

          <header className="relative w-full px-6 pt-12 pb-4 flex justify-between items-center z-10">
            <button
              type="button"
              onClick={onExit}
              className="w-10 h-10 flex items-center justify-center rounded-full boss-glass-card"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-4 py-1.5 boss-glass-card rounded-full">
              <Star className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs font-bold tracking-widest uppercase">Rank: Elite</span>
            </div>
          </header>

          <main className="relative z-10 w-full max-w-md px-6 flex flex-col items-center flex-shrink-0">
            <div className="mt-4 mb-6 relative">
              <div className="absolute inset-0 bg-[#3B82F6] blur-3xl opacity-20 rounded-full" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center shadow-2xl relative border border-white/20">
                <Zap className="w-10 h-10 text-white lightning-bolt" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="font-display-boss text-3xl font-black neon-glow tracking-tighter text-white uppercase italic">
                Boss Battle
                <br />
                <span className="text-[#8B5CF6]">Equation-X</span>
              </h1>
              <p className="mt-3 text-slate-400 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                Conquer the master of Quadratics in a high-speed duel!
              </p>
            </div>

            <div className="w-full space-y-3 mb-10">
              <div className="boss-glass-card p-4 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center border border-[#3B82F6]/30">
                  <HelpCircle className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">5 Questions</h3>
                  <p className="text-xs text-slate-400">Rapid fire quadratic equations</p>
                </div>
              </div>
              <div className="boss-glass-card p-4 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center border border-[#F59E0B]/30">
                  <Gauge className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Speed Kills</h3>
                  <p className="text-xs text-slate-400">Bonus points for lightning responses</p>
                </div>
              </div>
              <div className="boss-glass-card p-4 rounded-2xl flex items-center gap-4 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center border border-[#8B5CF6]/30">
                  <Trophy className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Boss Rewards</h3>
                  <p className="text-xs text-slate-400">Exclusive badges & XP multipliers</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-4 mb-5">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-[#3B82F6] p-1">
                    <img
                      src={`${basePath}/avik-das.png`}
                      alt="You"
                      className="w-full h-full rounded-full object-cover grayscale-[0.2]"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#3B82F6] text-[10px] font-bold px-2 py-0.5 rounded-full text-white border border-[#0A0118]">
                    YOU
                  </div>
                </div>
                <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">Pro Gamer</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-display-boss text-4xl font-black italic text-white pulse-vs">VS</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-[#8B5CF6] p-1">
                    <img
                      src={`${basePath}/ray-z.jpg`}
                      alt="Equation-X Boss AI"
                      className="w-full h-full rounded-full object-cover hue-rotate-[280deg]"
                    />
                  </div>
                  <div className="absolute -bottom-1 -left-1 bg-[#8B5CF6] text-[10px] font-bold px-2 py-0.5 rounded-full text-white border border-[#0A0118]">
                    BOSS
                  </div>
                </div>
                <span className="text-xs font-bold tracking-wider text-[#8B5CF6] uppercase">Equation-X</span>
              </div>
            </div>
          </main>

          <footer className="relative z-10 w-full px-6 pt-2 pb-6">
            <button
              type="button"
              onClick={startGame}
              className="w-full py-5 bg-gradient-to-r from-[#8B5CF6] to-purple-400 rounded-2xl text-white font-display-boss font-black text-xl tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.5)] btn-glow transition-all active:scale-95"
            >
              Enter The Arena
            </button>
          </footer>

          <div className="fixed top-0 right-0 w-64 h-64 bg-[#8B5CF6] opacity-10 blur-[100px] pointer-events-none" />
          <div className="fixed bottom-0 left-0 w-64 h-64 bg-[#3B82F6] opacity-10 blur-[100px] pointer-events-none" />
        </div>
      )
    }

    // Friend mode – simpler intro
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <button type="button" onClick={onExit} className="p-2">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Challenge a Friend</h1>
          <div className="w-10" />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2563eb] to-[#60a5fa] flex items-center justify-center mb-6">
            <Zap className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">Challenge a Friend</h2>
          <p className="text-gray-400 text-center mb-8">Share the link with a friend to start the challenge!</p>
          <div className="flex items-center gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2563eb] mb-2">
                <img src={`${basePath}/avik-das.png`} alt="You" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-medium">You</p>
            </div>
            <div className="text-2xl font-bold text-[#60a5fa]">VS</div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#f59e0b] mb-2">
                <img src={`${basePath}/ray-z.jpg`} alt="Friend" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-medium">Friend</p>
            </div>
          </div>
          <Button onClick={startGame} className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-6 rounded-full text-lg font-semibold">
            Start Challenge
          </Button>
        </div>
      </div>
    )
  }

  // Countdown Screen
  if (gameState === "countdown") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center">
        <div className="text-8xl font-bold text-[#2563eb] animate-bounce">
          {countdown}
        </div>
        <p className="text-xl mt-4 text-gray-400">Get Ready!</p>
      </div>
    )
  }

  // Results Screen
  if (gameState === "result") {
    const playerWon = playerScore > opponentScore
    const isDraw = playerScore === opponentScore

    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-800">
          <button onClick={onExit} className="p-2">
            <X className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg">Results</h1>
          <div className="w-10" />
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Result Icon */}
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mb-6",
            playerWon ? "bg-gradient-to-br from-[#22c55e] to-[#16a34a]" : 
            isDraw ? "bg-gradient-to-br from-[#eab308] to-[#ca8a04]" :
            "bg-gradient-to-br from-[#ef4444] to-[#dc2626]"
          )}>
            {playerWon ? (
              <Trophy className="w-12 h-12" />
            ) : isDraw ? (
              <span className="text-4xl">🤝</span>
            ) : (
              <span className="text-4xl">😢</span>
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {playerWon ? "You Won!" : isDraw ? "It's a Draw!" : "Better Luck Next Time!"}
          </h2>
          <p className="text-gray-400 mb-8">
            {playerWon 
              ? "Amazing performance! Keep it up!" 
              : isDraw 
              ? "So close! Try again to win!"
              : "Practice makes perfect!"}
          </p>

          {/* Score Comparison */}
          <div className="w-full bg-[#1a1a24] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#2563eb] mx-auto mb-2">
                  <img src="/avik-das.png" alt="You" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-gray-400">You</p>
                <p className="text-2xl font-bold text-[#2563eb]">{playerScore}</p>
              </div>
              <div className="text-gray-500 text-sm">VS</div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#f59e0b] mx-auto mb-2">
                  <img src="/ray-z.jpg" alt="Equation-X" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm text-gray-400">{mode === "bot" ? "Equation-X" : "Friend"}</p>
                <p className="text-2xl font-bold text-[#f59e0b]">{opponentScore}</p>
              </div>
            </div>

            {/* Answer Summary */}
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400 mb-3">Your Answers</p>
              <div className="flex justify-center gap-2">
                {playerAnswers.map((correct, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-bold",
                      correct ? "bg-[#22c55e]/20 text-[#22c55e]" : "bg-[#ef4444]/20 text-[#ef4444]"
                    )}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3">
            <Button
              onClick={resetGame}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-5 rounded-full font-semibold flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </Button>
            <Button
              onClick={onExit}
              variant="outline"
              className="w-full bg-transparent border-gray-700 text-white hover:bg-gray-800 py-5 rounded-full font-semibold flex items-center justify-center gap-2"
            >
              Back to Chapter
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onExit} className="p-2">
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className={cn(
              "font-bold text-lg",
              timeLeft <= 3 ? "text-[#ef4444]" : "text-white"
            )}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-10" />
        </div>

        {/* Score Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#2563eb]">
              <img src="/avik-das.png" alt="You" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold">{playerScore}</span>
          </div>
          
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div 
                className="h-full bg-[#2563eb] transition-all duration-300"
                style={{ width: `${playerScore > 0 ? (playerScore / (playerScore + opponentScore || 1)) * 100 : 50}%` }}
              />
              <div 
                className="h-full bg-[#f59e0b] transition-all duration-300"
                style={{ width: `${opponentScore > 0 ? (opponentScore / (playerScore + opponentScore || 1)) * 100 : 50}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold">{opponentScore}</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#f59e0b]">
              <img src="/ray-z.jpg" alt="Equation-X" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Question Progress */}
      <div className="px-4 py-3">
        <div className="flex gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-all",
                index < currentQuestion
                  ? playerAnswers[index]
                    ? "bg-[#22c55e]"
                    : "bg-[#ef4444]"
                  : index === currentQuestion
                  ? "bg-[#2563eb]"
                  : "bg-gray-700"
              )}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 py-6">
        <div className="bg-[#1a1a24] rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-center leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showResult = showFeedback

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={cn(
                  "w-full p-4 rounded-xl text-left font-medium transition-all border-2",
                  showResult
                    ? isCorrect
                      ? "bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e]"
                      : isSelected
                      ? "bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444]"
                      : "bg-[#1a1a24] border-gray-700 text-gray-400"
                    : isSelected
                    ? "bg-[#2563eb]/20 border-[#2563eb] text-white"
                    : "bg-[#1a1a24] border-gray-700 hover:border-gray-600 text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                    showResult
                      ? isCorrect
                        ? "bg-[#22c55e] text-white"
                        : isSelected
                        ? "bg-[#ef4444] text-white"
                        : "bg-gray-700 text-gray-400"
                      : isSelected
                      ? "bg-[#2563eb] text-white"
                      : "bg-gray-700 text-gray-300"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Speed Bonus Indicator */}
        {showFeedback && playerAnsweredFirst && selectedAnswer === question.correctAnswer && (
          <div className="mt-4 flex items-center justify-center gap-2 text-[#eab308] animate-bounce">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">Speed Bonus +5!</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        )}
      </div>
    </div>
  )
}
