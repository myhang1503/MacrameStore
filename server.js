import express from 'express'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000

// Serve ảnh
app.use('/product_Image', express.static(join(__dirname, 'public', 'product_Image')))

// Serve Nuxt static files
app.use('/', serveStatic(join(__dirname, '.output/public')))

// Fallback cho mọi route (SPA)
app.get(/^\/(?!product_Image).*/, (req, res) => {
  res.sendFile(join(__dirname, '.output/public/index.html'))
})

const getLocalIp = () => {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return 'localhost'
}

const localIp = getLocalIp()
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running at: http://${localIp}:${port}`)
})