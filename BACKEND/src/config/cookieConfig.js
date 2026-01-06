// export  const  cookieConfigurations = () => {
//     return  {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }




export const cookieConfigurations = () => {
  const isProduction = process.env.FRONTEND_URL?.startsWith("https");
    return {
      httpOnly: true,
      secure:  isProduction, 
      sameSite:isProduction ? 'none' : 'lax', 
      maxAge: 1000 * 60 * 60 * 24 * 7
    };
  };
  