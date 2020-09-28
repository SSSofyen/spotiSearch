const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('API running'))

//routes under link /api/users to the / in /routes/api/users
// app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(` server started on ${PORT}`))
