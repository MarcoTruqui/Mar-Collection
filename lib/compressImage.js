// Resizes and re-compresses a photo client-side before it's sent — a phone
// camera photo can be several MB, and this now travels guest's browser -> our
// server -> Apps Script (two hops, two payload-size limits) instead of going
// straight to Apps Script, so keeping the upload small matters more here than
// it used to. Non-image files (e.g. a PDF ID) pass through unchanged.
export function compressImage(file, { maxDimension = 1600, quality = 0.75 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => resolve({ base64: reader.result, mimeType: file.type })
      reader.onerror = () => reject(new Error('Failed to read file.'))
      reader.readAsDataURL(file)
      return
    }

    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      let { width, height } = img
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      resolve({ base64: canvas.toDataURL('image/jpeg', quality), mimeType: 'image/jpeg' })
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image.'))
    }
    img.src = objectUrl
  })
}
