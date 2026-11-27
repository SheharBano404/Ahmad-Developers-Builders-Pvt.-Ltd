// Returns {type:'youtube'|'vimeo'|'mp4', id|src, thumb} or null if unsupported.
export function parseVideo(url = '') {
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (m) return { type: 'youtube', id: m[1], thumb: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` }
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (m) return { type: 'vimeo', id: m[1], thumb: '' }
  if (/\.(mp4|webm)(\?.*)?$/i.test(url)) return { type: 'mp4', src: url, thumb: '' }
  return null
}
