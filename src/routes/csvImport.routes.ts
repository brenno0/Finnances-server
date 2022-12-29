import { Router } from 'express'
import multer from 'multer';
import { ensureAuthentication } from '../middlewares/ensureAuthentication'
import { CsvNubankImportController } from '../modules/CsvImport/UseCases/NubankImport/CsvNubankImportController';

const nubankCsvImportRoutes = Router();
const csvNubankImportController = new CsvNubankImportController()
const multerConfig = multer()
    
nubankCsvImportRoutes.post('/nubank',ensureAuthentication,multerConfig.single("file"),csvNubankImportController.handle)



export  { nubankCsvImportRoutes }