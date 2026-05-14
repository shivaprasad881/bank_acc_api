const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");
const userpin = params.get("pin");

function history(){
    window.location.href = "history.html?accno=" + useracc;
}

function update_Pin(){
    window.location.href = "updatepin.html?accno=" + useracc + "&pin=" + userpin;
}

function profile() {
    window.location.href = "profile.html?accno=" + useracc + "&pin=" + userpin;
}

function check_balance() {
    url = "http://localhost:8080/check_balance?accno=" + useracc;
    
    //it is get method
    fetch(url, {
        method: 'get'
    })
    .then(response => response.text())
    .then(data => {
        showToast(data);
    })
    .catch(error => {
        showToast("error in fetching the balance !!");
    });
}//checkbalance

function deposit_money() {
    window.location.href = "deposit.html?accno=" + useracc;
}

function withdrawl_money() {
    window.location.href = "withdrawl.html?accno=" + useracc;
}

function transfer() {
    window.location.href = "transfer.html?accno=" + useracc;
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