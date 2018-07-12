function register(url, username, password) {

    return fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        dataType: "json",
        redirect: "follow", 
        referrer: "no-referrer",
        body: JSON.stringify({username, password}),
    })
    .then(res => window.alert(res))
    .catch(window.alert('error :('));
}