import { useState, useCallback, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout.tsx'
import InputScreen from './components/InputScreen.tsx'
import LoadingScreen from './components/LoadingScreen.tsx'
import ResultScreen from './components/ResultScreen.tsx'
import { calculateScore } from './utils/compatibility.ts'

/** 画面フェーズ */
type Phase = 'input' | 'loading' | 'result'

/** アプリケーションルート */
export default function App() {
  const [phase, setPhase] = useState<Phase>('input')
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [score, setScore] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  /** 診断開始 */
  const handleDiagnose = useCallback((n1: string, n2: string) => {
    setName1(n1)
    setName2(n2)
    setPhase('loading')

    // 2.5秒後に結果を表示
    timerRef.current = setTimeout(() => {
      const result = calculateScore(n1, n2)
      setScore(result)
      setPhase('result')
    }, 2500)
  }, [])

  /** 入力画面に戻る */
  const handleRetry = useCallback(() => {
    setPhase('input')
  }, [])

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <InputScreen key="input" onDiagnose={handleDiagnose} />
        )}
        {phase === 'loading' && (
          <LoadingScreen key="loading" name1={name1} name2={name2} />
        )}
        {phase === 'result' && (
          <ResultScreen
            key="result"
            name1={name1}
            name2={name2}
            score={score}
            onRetry={handleRetry}
          />
        )}
      </AnimatePresence>
    </Layout>
  )
}
