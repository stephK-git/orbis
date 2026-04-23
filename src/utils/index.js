export function fmt(n) {
  if (!n && n !== 0) return '—'
  if (n >= 1e9) return (n / 1e9).toFixed(2) + ' Md'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + ' M'
  if (n >= 1e3) return (n / 1e3).toFixed(0) + ' K'
  return n.toString()
}

export function textColor(r, g, b) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#1E1A14' : '#FFFDF8'
}

export function toRgb({ r, g, b }) {
  return `rgb(${r},${g},${b})`
}

export function toRgba({ r, g, b }, a) {
  return `rgba(${r},${g},${b},${a})`
}

export function extractFlagColors(imgUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const W = 80, H = 50
        canvas.width = W; canvas.height = H
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, W, H)
        const data = ctx.getImageData(0, 0, W, H).data
        const buckets = {}
        for (let i = 0; i < data.length; i += 16) {
          const r = Math.round(data[i] / 32) * 32
          const g = Math.round(data[i + 1] / 32) * 32
          const b = Math.round(data[i + 2] / 32) * 32
          if (data[i + 3] < 200) continue
          const br = (r + g + b) / 3
          if (br > 230 || br < 25) continue
          const key = `${r},${g},${b}`
          buckets[key] = (buckets[key] || 0) + 1
        }
        const sorted = Object.entries(buckets)
          .sort((a, b) => b[1] - a[1])
          .map(([k]) => k.split(',').map(Number))
        const picked = []
        for (const [r, g, b] of sorted) {
          if (picked.length >= 3) break
          const close = picked.some(([pr, pg, pb]) =>
            Math.abs(pr - r) + Math.abs(pg - g) + Math.abs(pb - b) < 80
          )
          if (!close) picked.push([r, g, b])
        }
        while (picked.length < 3) picked.push([120, 100, 80])
        resolve(picked.map(([r, g, b]) => ({ r, g, b })))
      } catch { resolve(null) }
    }
    img.onerror = () => resolve(null)
    img.src = imgUrl
  })
}
