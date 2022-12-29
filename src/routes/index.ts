import { Router } from 'express';
import { bankRoutes } from './bank.routes';
import { categoryRouter } from './category.routes';
import { nubankCsvImportRoutes } from './csvImport.routes';
import { productRoutes } from './product.routes';
import { userRoutes } from './user.routes';

const routes = Router()


routes.use('/users',userRoutes)
routes.use('/banks',bankRoutes)
routes.use('/categories',categoryRouter)
routes.use('/products',productRoutes)
routes.use('/csv/import',nubankCsvImportRoutes)

export { routes }