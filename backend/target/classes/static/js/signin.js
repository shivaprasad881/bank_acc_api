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

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    
    // Style the toast
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
    
    // Add to body
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}