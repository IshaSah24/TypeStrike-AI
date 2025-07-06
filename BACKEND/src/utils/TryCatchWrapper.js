export const catchAsync = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };

 // If  the  async  function  is resolved  or running  wihtout  any  error so  we  will do  the  further  operation  if not  then we will  catch  the  error  and pass  it  to the  global error  handler using  'catch(next)'