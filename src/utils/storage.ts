const STORAGE_KEY = 'compatibility-names'

interface SavedNames {
  name1: string
  name2: string
}

/** localStorageから名前を読み込む */
export function loadNames(): SavedNames {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { name1: '', name2: '' }
    const parsed = JSON.parse(raw) as SavedNames
    return {
      name1: typeof parsed.name1 === 'string' ? parsed.name1 : '',
      name2: typeof parsed.name2 === 'string' ? parsed.name2 : '',
    }
  } catch {
    return { name1: '', name2: '' }
  }
}

/** localStorageに名前を保存する */
export function saveNames(name1: string, name2: string): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name1, name2 }))
}
