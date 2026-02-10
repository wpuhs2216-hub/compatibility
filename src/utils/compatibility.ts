/** イカサマ対象の名前定義 */
const RIGGED_HIGH = ['えぐしゅぎ', 'あまつき']
const RIGGED_LOW = ['おおふぐり']

/** 名前ペアからハッシュ値を生成（順番に依存しない） */
function hashNames(name1: string, name2: string): number {
  // アルファベット順にソートして順番を正規化
  const sorted = [name1, name2].sort()
  const combined = sorted.join('|')

  // 簡易ハッシュ（djb2ベース）
  let hash = 5381
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) + hash + combined.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/** イカサマ範囲内のスコアを生成 */
function riggedScore(min: number, max: number, hash: number): number {
  return min + (hash % (max - min + 1))
}

/** 相性スコアを計算（0-100） */
export function calculateScore(name1: string, name2: string): number {
  const n1 = name1.trim()
  const n2 = name2.trim()
  const hash = hashNames(n1, n2)

  // イカサマ判定：高スコア側を優先
  const hasHigh1 = RIGGED_HIGH.some((r) => n1 === r)
  const hasHigh2 = RIGGED_HIGH.some((r) => n2 === r)
  const hasLow1 = RIGGED_LOW.some((r) => n1 === r)
  const hasLow2 = RIGGED_LOW.some((r) => n2 === r)

  // 高スコア名が含まれる場合（低スコア名より優先）
  if (hasHigh1 || hasHigh2) {
    return riggedScore(95, 100, hash)
  }

  // 低スコア名が含まれる場合
  if (hasLow1 || hasLow2) {
    return riggedScore(10, 20, hash)
  }

  // 通常計算
  return hash % 101
}

/** スコアに応じたコメントを返す */
export function getComment(score: number): string {
  if (score >= 90) return '運命の相手かも！'
  if (score >= 70) return 'とても良い相性です'
  if (score >= 50) return 'まずまずの相性'
  if (score >= 30) return 'もう少し歩み寄りが必要かも'
  return '正反対？だからこそ面白い！'
}

/** SNSシェア用テキストを生成 */
export function getShareText(name1: string, name2: string, score: number): string {
  return `${name1}と${name2}の相性は${score}%でした！ #えぐしゅぎラボ #相性診断`
}
