// import Service from '../../Service/service';

// var url = 'http://95d8750a.ngrok.io';

// class AuthenticationApi {
    
//     register(username, password) {
        
//         var regApi = url + '/register';

//         const options = {
//             method: 'POST',
//             headers: {'content-type': "application/json",},
//             data: JSON.stringify({username, password}),
//             regApi,
//         };

//         return new Promise((resolve, reject) => {
//             Service.doPost(options)
//                 .then((result) => resolve(result))
//                 .catch((err) => reject(err));
//         });
//     }
// }

// export default new AuthenticationApi();