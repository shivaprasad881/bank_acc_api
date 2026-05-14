function user_signup() {
    let uname = document.getElementById('uname').value;
    let age = document.getElementById('age').value;
    let city = document.getElementById('city').value;
    let phonenumber = document.getElementById('phonenumber').value;

    if(uname == "" || age == "" || parseInt(age) <= 0 || city == "" || phonenumber == "" || phonenumber.length != 10) {
        showToast("please enter valid details !!");
    } else {
        let url = "http://localhost:8080/register";

        let userData = {
            uname: uname,
            age: age,
            city: city,
            phonenumber: phonenumber
        };

        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.text())
        .then(data => {
            showToast(data);
            
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 4000);
        })
        .catch(error => {
            showToast("error !!");
        });
    }
}