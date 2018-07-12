import Service from '../../Service/service';

class AuthenticationApi {
    
    url = 'localhost';

    register(username, password) {

        return new Promise((resolve, reject) => {
            Service.doPost(this.url, {username, password})
                .then((result) => resolve(result.data))
                .catch((err) => reject(err));
        });
    }
}

export default new AuthenticationApi();