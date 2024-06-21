import express from 'express'
import cors from 'cors'
import {readFile , writeFile} from 'fs/promises';


const app = express()

const port = 3000
app.use(express.json());

app.listen(port, () => {

    console.log(`Servidor levantado en puerto ${port}`)
})

 app.use(cors({
     origin: 'http://127.0.0.1:5500'

 }))


const jsonIngredientes = await readFile('./ingredientes.json','utf-8')
const ingredientesData = JSON.parse(jsonIngredientes)


const jsonRecetas = await readFile('./recetas.json','utf-8')
const recetaData = JSON.parse(jsonRecetas)


app.post('/agregarIngredientes/',async (req,res) => {
const nombre = req.body.nombre

    try {
        const ultimoId = ingredientesData.length > 0 ? ingredientesData[ingredientesData.length -1].id + 1 : 1

        const data = {
            id: ultimoId,
            nombreIngrediente: nombre
        }
        ingredientesData.push(data)
        await writeFile('./ingredientes.json', JSON.stringify(ingredientesData, null, 2), 'utf-8');
        res.status(200)

    } catch (error) {
        res.status(400).json(error)
    }

})


app.post('/agregarRecetas/', async (req,res) => {
    const {name, ing} = req.body

    
    try {
        const ultimoId = recetaData.length > 0 ? recetaData[recetaData.length -1].id + 1 : 1
        const datos = {
            id: ultimoId,
            nombre: name,
            ing
        }
           
        recetaData.push(datos)

        await writeFile('./recetas.json', JSON.stringify(recetaData, null, 2), 'utf-8');
        res.status(200)
    } catch (error) {
        res.status(400).json(error)
    }
    
})



app.get('/infoIngredientes/', (req,res) => {
        
    try {
     
        res.status(200).json(ingredientesData);
    } catch (error) {
        res.status(400).json(error)
    }
        
})


app.get('/infoRecetas/',(req,res) => {
            
    try {

     res.status(200).json(recetaData);
    } catch (error) {
        res.status(400).json(error)
    }
})