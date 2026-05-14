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

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#333';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '14px';
    toast.style.fontFamily = 'system-ui, sans-serif';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}