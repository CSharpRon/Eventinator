import axios from 'axios';

class Service {

    doPost(options) {
        return new Promise((resolve, reject) => {
            this.doCallREST(options)
                .then((result) => resolve(result))
                .catch((err) => {
                    console.log('post error: ' + JSON.stringify(err));
                    reject(err);
                });
        });
    }

    // doUpdate(url, params) {
    //     return new Promise((resolve, reject) => {
    //         this.doCallREST(url, params, 'update')
    //             .then((result) => resolve(result))
    //             .catch((err) => reject(err));
    //     });
    // }

    // doGet(url) {
    //     return new Promise((resolve, reject) => {
    //         this.doCallREST(url, null, 'get')
    //             .then((result) => resolve(result))
    //             .catch((err) => reject(err));
    //     });
    // }

    // doDelete(url) {
    //     return new Promise((resolve, reject) => {
    //         this.doCallREST(url, null, 'delete')
    //             .then((result) => resolve(result))
    //             .catch((err) => reject(err));
    //     });
    // }

    doCallREST(options) {
        console.log('about to do call');
        return new Promise((resolve, reject) => {
            axios(options)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => reject(err));
            });
    }
}

export default new Service();
