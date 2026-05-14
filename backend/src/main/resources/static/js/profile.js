const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");
const userpin = params.get("pin");

function profile(){
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
        let bal = userdata[4];
        
        document.getElementById("accno").innerHTML = useracc;
        document.getElementById("pin").innerHTML = userpin;
        document.getElementById("uname").innerHTML = uname;
        document.getElementById("age").innerHTML = age;
        document.getElementById("city").innerHTML = city;
        document.getElementById("phonenumber").innerHTML = phone;
        document.getElementById("balance").innerHTML = bal;
    })
    .catch(error => {
        showToast("error in fetching the user details !!");
    });
}

profile();

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