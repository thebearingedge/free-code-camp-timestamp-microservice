
import express from 'express'
import fecha from 'fecha'
import { resolve } from 'path'


const app = express()
const indexHTML = resolve(__dirname, '../public/index.html')


const isTimestamp = value => !isNaN(value)


const fromTimestamp = stamp => {
  
  const unix = Number(stamp)
  const date = new Date(unix)
  const natural = fecha.format(date, 'MMMM D, YYYY')
  
  return { unix, natural }
}


const fromDate = date => {
  
  const unix = date.getTime()
  const natural = fecha.format(date, 'MMMM D, YYYY')
  
  return { unix, natural }
}


app.get('/', (_, res) => res.sendFile(indexHTML))


app.get('/:dateString', ({ params }, res) => {
  
  const { dateString } = params
  
  if (isTimestamp(dateString)) {
  
    return res.json(fromTimestamp(dateString))
  }
  
  const date = new Date(dateString)
  
  if (date.toString() === 'Invalid Date') {
    
    return res.json({ unix: null, natural: null })
  }
  
  return res.json(fromDate(date))
})


app.listen(process.env.PORT || 8080)
