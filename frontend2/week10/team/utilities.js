export async function getJSON(url) {
    const response = await fetch(url);
    if (!response.ok){
        throw Error(response.statusText);
    } else {
        return response.json();
    }
}

export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};
