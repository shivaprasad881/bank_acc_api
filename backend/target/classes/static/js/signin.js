function user_signin() {
    let useracc = document.getElementById("user_acc").value;
    let userpin = document.getElementById("pin").value;
    
    if(useracc == "" || userpin == "" || userpin.length != 4) {
        showToast("please fill the details");
    } else {
        //check whether the username and pin exists
        let url = "http://localhost:8080/check?accno=" + useracc + "&pin=" + userpin;

        fetch(url, {
            method: 'get'
        })
        .then(response => response.text())
        .then(data => {
            if(data == "true") {
                //user present
                showToast("successful login!!");
                
                setTimeout(() => {
                    window.location.href = "dashboard.html?accno=" + useracc + "&pin=" + userpin;
                }, 3000);
            } else {
                showToast("invalid credentials!!");
            }
        })
        .catch(error => {
            showToast("error in signin !!");
        });
    }
}
