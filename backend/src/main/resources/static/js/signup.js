function user_signup() {
    let uname = document.getElementById('uname').value;
    let age = document.getElementById('age').value;
    let city = document.getElementById('city').value;
    let phonenumber = document.getElementById('phonenumber').value;
    let password = document.getElementById('password').value;

    console.log("password being sent: " + password);

    if(uname == "" || age == "" || parseInt(age) <= 0 || city == "" || phonenumber == "" || phonenumber.length != 10 || password == "") {
        showToast("please enter valid details !!");
    } else {
        let url = "http://localhost:8080/register";

        let userData = {
            uname: uname, 
            age: age,
            city: city,
            phonenumber: phonenumber,
            password : password
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
            // showToast("Registration successfull !!!",1000);
            
            
            
            // setTimeout(() => {
            //     showToast(data,2000);
                
            //     setTimeout(() => {
            //         window.location.href = "signin.html";
            //     }, 2000)

            // }, 1000);

            showToast(data)

            setTimeout(() => {
                window.location.href = "signin.html";
            }, 3000)

            
        })
        .catch(error => {
            showToast("error in registration !!");
        });
    }
}