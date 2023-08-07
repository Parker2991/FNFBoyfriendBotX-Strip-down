module.exports = {
  name: 'validate',
  
  hashOnly: false,//set to true ONLY if it is connected to a discord server
  
  execute (context)  {
   const source = context.source

    
   source.sendFeedback({ text: 'Valid Hash', color: 'dark_green' })
  }
}
