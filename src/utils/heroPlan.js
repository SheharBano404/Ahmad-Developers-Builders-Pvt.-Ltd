const artwork = { width: 1672, height: 941 }
export const planCrop = { x: 227, y: 178, width: 458, height: 564 }

const flatPlan = [
  [planCrop.x, planCrop.y],
  [planCrop.x + planCrop.width, planCrop.y],
  [planCrop.x + planCrop.width, planCrop.y + planCrop.height],
  [planCrop.x, planCrop.y + planCrop.height],
]

const tiltedPlan = [[456, 337], [1115, 308], [1266, 697], [383, 731]]
const foundationPlan = [[783, 687], [1486, 731], [1038, 801], [141, 734]]

export function easeBetween(progress, start, end) {
  const fraction = Math.max(0, Math.min(1, (progress - start) / (end - start)))
  return fraction * fraction * (3 - 2 * fraction)
}

export function projectPlan(progress, width, height, cover, zoom) {
  const fit = cover ? Math.max : Math.min
  const scale = fit(width / artwork.width, height / artwork.height)
  const left = (width - artwork.width * scale) / 2
  const top = (height - artwork.height * scale) * (cover ? 0.52 : 0.5)
  const remaining = 1 - progress
  const [first, second, third, fourth] = flatPlan.map((corner, index) => {
    const [x, y] = corner.map((start, axis) => {
      const end = foundationPlan[index][axis]
      const control = 2 * tiltedPlan[index][axis] - (start + end) / 2
      return remaining ** 2 * start + 2 * remaining * progress * control + progress ** 2 * end
    })
    const screenX = left + x * scale
    const screenY = top + y * scale
    return [(screenX - width / 2) * zoom + width / 2, (screenY - height / 2) * zoom + height / 2]
  })

  // A projective transform maps the original four crop corners onto the tilted plane.
  const [x0, y0] = first, [x1, y1] = second, [x2, y2] = third, [x3, y3] = fourth
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3
  const determinant = dx1 * dy2 - dx2 * dy1
  const g = (dx3 * dy2 - dx2 * dy3) / determinant
  const h = (dx1 * dy3 - dx3 * dy1) / determinant
  const { width: cropWidth, height: cropHeight } = planCrop
  return `matrix3d(${(x1 - x0 + g * x1) / cropWidth},${(y1 - y0 + g * y1) / cropWidth},0,${g / cropWidth},${(x3 - x0 + h * x3) / cropHeight},${(y3 - y0 + h * y3) / cropHeight},0,${h / cropHeight},0,0,1,0,${x0},${y0},0,1)`
}
