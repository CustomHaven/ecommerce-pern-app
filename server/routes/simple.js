const simpleRouter = require('express').Router();

module.exports = (app)=> {
  app.use('/hi', simpleRouter);

  simpleRouter.get('/', async (req, res) => {
    try {
      // console.log(req)
    res.status(200).json('hello from express!')
        
    } catch (error) {
      logger.log(error)
    }
  })
}