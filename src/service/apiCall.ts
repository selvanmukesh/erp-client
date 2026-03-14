export const get = (url: string) => {
    return fetch(url).then(res => res.json());
};

export const post = (url: string, body: any) => {
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include", 
        body: JSON.stringify(body)
    }).then(res => res.json());
};  

export const del = (url: string) => {
    return fetch(url, {
        method: "DELETE"
    }).then(res => res.json());
};