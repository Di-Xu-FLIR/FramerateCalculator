callWs = function () {
    // The Endpoint URL
    let url = "https://jsonplaceholder.typicode.com/posts/1";
    fetch(url)
        .then(function (response) {
            // Render the Response Status
            document.getElementById("result").innerHTML = response.status;
            // Parse the body as JSON
            return response.json();
        })
        .then(function (json) {
            // Render the parsed body
            document.getElementById("result_json").innerHTML = JSON.stringify(json);
        });
};

button2_function = function () {
    // const url = "http://10.195.100.158:5000/api/camera_settings";
    const url = "http://127.0.0.1:5000/api/camera_settings";

    console.log("url: ", url);

    const params = {
        model: "BFS-U3-161S7C",
        pixel_format: "Mono8",
        width: 5320,
        height: 8,
        isp: "OFF",
        adc: "8 Bit",
        bin_selector: "isp",
        bin_x: 1,
        bin_y: 1,
        bin_mode_x: "average",
        bin_mode_y: "average",
    };

    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

    fetch(`${url}?${queryString}`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    // const url = 'http://127.0.0.1:5000/';
    // console.log('url: ', url);

    // fetch(`${url}`)
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));
};
