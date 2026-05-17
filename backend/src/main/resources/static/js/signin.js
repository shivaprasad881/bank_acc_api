function user_signin() {
    let useracc = document.getElementById("user_acc").value;
    let userpass = document.getElementById("password").value;
    
    if(useracc == "" || userpass == "" ) {
        showToast("please fill the details");
    } else {
        let url = "http://localhost:8080/validate_user?accno=" + useracc + "&password=" + userpass;

        fetch(url, {
            method: 'get'
        })
        .then(response => response.text())
        .then(data => {
            if(data == "true") {
                //user present
                showToast("successful login!!",2000);
                
                setTimeout(() => {
                    window.location.href = "dashboard.html?accno=" + useracc;
                }, 2000);
            } else {
                showToast("Invalid credentials !!");
            }
        })
        .catch(error => {
            showToast("Error in validating the user credencials !!");
        });
    }
}
