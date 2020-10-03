const express = require('express')
const app = express()

//init middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API running'))

//routes under link /api/search to the / in /routes/api/search
app.use('/api/search', require('./routes/api/search'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(` server started on ${PORT}`))
