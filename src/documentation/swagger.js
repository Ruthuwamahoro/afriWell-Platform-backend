import express from 'express'
import * as YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
const swaggerJsdoc = YAML.load('./src/documentation/swagger.yaml')
import logger from 'winston'

function swaggerDocs(app,port) {
    app.use(express.json())
    app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc))
    logger.info(`Swagger docs available at http://localhost:${port}/api/doc`)
}


export default swaggerDocs
