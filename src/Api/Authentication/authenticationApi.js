import Service from '../../Service/service';

class AuthenticationApi {
    
    url = 'http://2ba3514d.ngrok.io/register';

    register(username, password) {

        return new Promise((resolve, reject) => {
            Service.doPost(this.url, {username, password})
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
}

export default new AuthenticationApi();