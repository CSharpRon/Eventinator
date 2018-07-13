import $ from 'jquery';

class Service {
    doPost(url, params) {
        return new Promise((resolve, reject) => {
            this.doCallREST(url, params, 'post')
                .then((result) => resolve(result))
                .catch((err) => {
                    console.log('post error: ' + JSON.stringify(err));
                    reject(err);
                });
        });
    }

    doUpdate(url, params) {
        return new Promise((resolve, reject) => {
            this.doCallREST(url, params, 'update')
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }

    doGet(url) {
        return new Promise((resolve, reject) => {
            this.doCallREST(url, null, 'get')
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }

    doDelete(url) {
        return new Promise((resolve, reject) => {
            this.doCallREST(url, null, 'delete')
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }

    doCallREST(url, body, httpVerb) {
        return new Promise((resolve, reject) => {
            $.ajax(url, {
                data: JSON.stringify(body),
                type: httpVerb,
                contentType: 'application/json',
                success: (result) => {
                    if (result && result.status && result.status == 1) {
                        resolve(result);
                    }

                    reject(result);
                },
                error: (err) => reject(err)
            });
        });
    }
}

export default new Service();
