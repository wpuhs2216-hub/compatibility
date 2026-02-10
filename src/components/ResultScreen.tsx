import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, RotateCcw, Check, Copy } from 'lucide-react'
import CircleProgress from './CircleProgress.tsx'
import { getComment, getShareText } from '../utils/compatibility.ts'

interface ResultScreenProps {
  name1: string
  name2: string
  score: number
  onRetry: () => void
}

/** 結果画面 */
export default function ResultScreen({ name1, name2, score, onRetry }: ResultScreenProps) {
  const [copied, setCopied] = useState(false)
  const comment = getComment(score)
  const shareText = getShareText(name1, name2, score)
  const supportsShare = typeof navigator.share === 'function'

  /** シェアボタン押下時の処理 */
  const handleShare = async () => {
    // Web Share API対応ブラウザ
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText })
        return
      } catch {
        // シェアキャンセル時はクリップボードへフォールバック
      }
    }

    // 非対応またはキャンセル時：クリップボードにコピー
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボードAPIも使えない場合は何もしない
    }
  }

  return (
    <motion.div
      className="w-full max-w-sm mx-auto text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="rounded-2xl p-6 space-y-6"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {/* 名前の表示 */}
        <div className="flex items-center justify-center gap-3 text-lg font-medium">
          <span style={{ color: 'var(--color-primary)' }}>{name1}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>&</span>
          <span style={{ color: 'var(--color-accent)' }}>{name2}</span>
        </div>

        {/* 円形プログレスバー */}
        <div className="flex justify-center py-4">
          <CircleProgress score={score} />
        </div>

        {/* コメント */}
        <motion.p
          className="text-lg font-medium"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {comment}
        </motion.p>

        {/* ボタン群 */}
        <motion.div
          className="space-y-3 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {/* シェアボタン */}
          <motion.button
            onClick={handleShare}
            className="w-full rounded-xl py-3 text-base font-bold text-white flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            }}
            whileTap={{ scale: 0.96 }}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                コピーしました
              </>
            ) : (
              <>
                {supportsShare ? (
                  <Share2 className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                シェアする
              </>
            )}
          </motion.button>

          {/* もう一度診断ボタン */}
          <motion.button
            onClick={onRetry}
            className="w-full rounded-xl py-3 text-base font-medium flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text-muted)',
              border: '1px solid #333',
            }}
            whileTap={{ scale: 0.96 }}
          >
            <RotateCcw className="w-5 h-5" />
            もう一度診断する
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
