import express from 'express'
import morgan from 'morgan';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { queryByNi } from './db.js';


const app = express();
const upload = multer();

// const upload = multer();
app.use(express.static(path.resolve('public')))
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(morgan('dev'))

let port = 3000


app.get('/search', async(req, res) => {
    const filePath = path.resolve('./index.html'); 
    res.status(200).sendFile(filePath)
})


app.post('/sandbox', upload.none(), async(req, res) => {
    try {

        let query= {...req.body};
        query = query.search_query
        console.log(query)

        const response = await queryByNi(`${query}`)
        console.log(response)

        res.status(200).json({data: response})


    } catch (err){
        console.lof(err)
        console.log('err above')
    }
})



app.listen(port, () => {
    console.log('active: http://localhost:3000/search')
})