async function toBase64(file: File): Promise<string> {
  console.log(file)
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return buffer.toString("base64")
}

export default toBase64
