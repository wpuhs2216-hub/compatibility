import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { loadNames, saveNames } from '../utils/storage.ts'

interface InputScreenProps {
  onDiagnose: (name1: string, name2: string) => void
}

/** 名前入力画面 */
export default function InputScreen({ onDiagnose }: InputScreenProps) {
  const saved = loadNames()
  const [name1, setName1] = useState(saved.name1)
  const [name2, setName2] = useState(saved.name2)

  const canSubmit = name1.trim().length > 0 && name2.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    saveNames(name1.trim(), name2.trim())
    onDiagnose(name1.trim(), name2.trim())
  }

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="rounded-2xl p-6 space-y-6"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {/* ハートアイコン */}
        <div className="flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Heart
              className="w-16 h-16"
              style={{ color: 'var(--color-primary)' }}
              fill="var(--color-primary)"
            />
          </motion.div>
        </div>

        {/* 説明テキスト */}
        <p
          className="text-center text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          2人の名前を入力して相性を診断しよう
        </p>

        {/* 名前入力フィールド */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              1人目の名前
            </label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              maxLength={10}
              placeholder="名前を入力"
              className="w-full rounded-lg px-4 py-3 text-base outline-none transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: '1px solid #333',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
          </div>

          {/* ハート区切り */}
          <div className="flex justify-center">
            <Heart
              className="w-5 h-5"
              style={{ color: 'var(--color-accent)' }}
              fill="var(--color-accent)"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              2人目の名前
            </label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              maxLength={10}
              placeholder="名前を入力"
              className="w-full rounded-lg px-4 py-3 text-base outline-none transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                border: '1px solid #333',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
              onBlur={(e) => (e.target.style.borderColor = '#333')}
            />
          </div>
        </div>

        {/* 診断ボタン */}
        <motion.button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full rounded-xl py-3 text-base font-bold text-white flex items-center justify-center gap-2 transition-opacity duration-200"
          style={{
            background: canSubmit
              ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
              : '#444',
            opacity: canSubmit ? 1 : 0.5,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
          whileTap={canSubmit ? { scale: 0.96 } : undefined}
        >
          <Sparkles className="w-5 h-5" />
          診断する
        </motion.button>
      </div>
    </motion.div>
  )
}
