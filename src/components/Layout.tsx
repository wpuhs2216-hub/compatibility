import type { ReactNode } from 'react'
import { Heart } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

/** アプリ全体のレイアウト */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* ヘッダー */}
      <header className="flex items-center justify-center gap-2 py-4 px-4">
        <Heart className="w-6 h-6" style={{ color: 'var(--color-primary)' }} fill="var(--color-primary)" />
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
          相性診断
        </h1>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        {children}
      </main>
    </div>
  )
}
