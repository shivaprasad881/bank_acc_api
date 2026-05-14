const params = new URLSearchParams(window.location.search);
const useracc = params.get("accno");

let data;

function goBack() {
    window.location.href = "dashboard.html?accno=" + useracc;
}

let url = "http://localhost:8080/user_transactions?accno=" + useracc;

fetch(url, {
    method: 'GET'
})
.then(response => response.json())
.then(jsondata => {
    data = jsondata;
    for(let i = 0; i < jsondata.length; i++) {
        let tar_acc_value = jsondata[i].tarAcc;
        let amount_value = jsondata[i].amount;
        let transaction_type_value = jsondata[i].transactionType;
        let transaction_date_value = jsondata[i].transactionDate;

        let updated = transaction_date_value.substring(0,10) + " " + transaction_date_value.substring(11,19);

        document.getElementById("tableBody").innerHTML += `
        <tr>
            <td>${tar_acc_value}</td>
            <td>${amount_value}</td>
            <td>${transaction_type_value}</td>
            <td>${updated}</td>
        </table>
        `;
    }
})
.catch(error => {
    showToast("error in fetching the history !!");
});

function download() {
    // we need to include all the transactions of the user in a pdf and download it
    const doc = new jspdf.jsPDF();

    // x should remain 10 but y would be increment by 10
    doc.text("Transaction records ", 45, 10);
    
    let y = 20;

    for(let i = 0; i < data.length; i++) {
        //each json object
        let str = JSON.stringify(data[i]); // each json object converted into string
        
        //each line can hold 80 characters only
        str = (i + 1) + "].   " + str;
        
        let len = str.length;
        let start = 0;

        while(len > 70) {
            doc.text(str.substring(start, start + 70), 10, y);
            len -= 70;
            y += 8;
            start += 70;
        }

        if(len != 0) {
            //still something left - add it in new line
            doc.text(str.substring(start), 10, y);
        }
        
        y += 11;
    }

    doc.save("first.pdf");
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