const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 5000

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/hi', async (req, res) => {
    try {
    res.status(200).json('hello from express!')
        
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => console.log(`Server is listening on port #${PORT}`))