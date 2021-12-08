import app from "../app";
import { createConnection, QueryFailedError } from 'typeorm';

// DB connect

(async () =>{
    try {
        await createConnection();
        app.listen(process.env.SERVER_PORT, ()=>{
            console.log("SERVER RUN")
        })
    } catch (err) {
        console.log("DB CONNECTION ERROR : ", err);
    }
})();

// createConnection()
// .then(async connection => {
//     // todo: err handler 추가
//     interface Error {   
//       status?: number;
//       message?: string;
//     }
//     app.listen(process.env.SERVER_PORT, ()=>{
//         console.log("SERVER RUN")
//     })
// })
// .catch(err => {
//   // throw 'serverDbErr;'
//   console.log("DB CONNECTION ERROR : ", err);
//   return;
// });


