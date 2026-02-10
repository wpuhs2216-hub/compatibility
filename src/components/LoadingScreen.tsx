import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface LoadingScreenProps {
  name1: string
  name2: string
}

/** 診断中アニメーション画面 */
export default function LoadingScreen({ name1, name2 }: LoadingScreenProps) {
  return (
    <motion.div
      className="w-full max-w-sm mx-auto text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* 名前の表示 */}
      <div className="flex items-center justify-center gap-3 text-lg font-medium">
        <span style={{ color: 'var(--color-primary)' }}>{name1}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>&</span>
        <span style={{ color: 'var(--color-accent)' }}>{name2}</span>
      </div>

      {/* 脈打つハートアニメーション */}
      <div className="flex justify-center py-8">
        <motion.div
          animate={{
            scale: [1, 1.3, 1, 1.3, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Heart
            className="w-24 h-24"
            style={{ color: 'var(--color-primary)' }}
            fill="var(--color-primary)"
          />
        </motion.div>
      </div>

      {/* 診断中テキスト */}
      <motion.p
        className="text-base"
        style={{ color: 'var(--color-text-muted)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        相性を診断中...
      </motion.p>
    </motion.div>
  )
}
