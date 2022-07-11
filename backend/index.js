import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000 // 5000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        wtimeout: 2500, }
    )   

    .catch(err => {
        console.log(err.stack)
        process.exit(1)
    })

    .then(async client => {
        await RestaurantsDAO.injectDB(client)
        app.listen(port, () => {
            console.log('Server is listening on port ' + port)
        })
    })