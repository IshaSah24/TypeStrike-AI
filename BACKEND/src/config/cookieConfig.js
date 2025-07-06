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
      secure:  false, // true in production
      sameSite: 'lax', // ← FIXED here
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    };
  };
  