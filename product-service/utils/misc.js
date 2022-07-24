export const logger = (handlerCallback) => 
  async (event) => {
    console.log('event object ', event);
    return await handlerCallback(event);
  }