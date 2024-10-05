const errorHandlerMiddleware = (err,req,res,next) => {
    console.log('Pakeg Error : ', err);
    
    return res.status(500).json({message : err.message})
}
const notFound = (req,res) => {
    return  res.status(400).json({message : 'Router does not exist...'})
}

module.exports = {errorHandlerMiddleware,notFound};