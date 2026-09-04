export type AnnouncementItem = {
  name: string
  color: string
}

export const db: AnnouncementItem[] = [
  { name: 'Tracked dispatch from Germany', color: 'fill-cyan-400' },
  { name: 'Pre-filled pens, ready to use', color: 'fill-indigo-400' },
  { name: 'Lyophilised vials, reconstitute before use', color: 'fill-lime-400' },
  { name: 'Secure payment', color: 'fill-yellow-400' },
  { name: 'Batch documentation with every order', color: 'fill-emerald-400' },
  { name: 'Research use only', color: 'fill-purple-400' }
]
