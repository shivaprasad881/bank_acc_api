const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");


    url = "http://localhost:8080/user_details?accno=" + useracc;

    fetch(url, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        let userdata = data.split(",");
        let uname = userdata[0];
        let age = userdata[1];
        let city = userdata[2];
        let phone = userdata[3];
        
        document.getElementById("accno").innerHTML = useracc;
        document.getElementById("uname").innerHTML = uname;
        document.getElementById("age").innerHTML = age;
        document.getElementById("city").innerHTML = city;
        document.getElementById("phonenumber").innerHTML = phone;
    })
    .catch(error => {
        showToast("error in fetching the user details !!");
    });
