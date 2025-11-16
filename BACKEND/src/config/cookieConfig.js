// export  const  cookieConfigurations = () => {
//     return  {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }



export const cookieConfigurations = () => {
    return {
      httpOnly: true,
      secure:  false, 
      sameSite: 'lax', 
      maxAge: 1000 * 60 * 60 * 24 * 7
    };
  };
  