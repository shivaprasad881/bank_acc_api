const params_trans = new URLSearchParams(window.location.search);
const useracc_trans = params_trans.get("accno");

function transfer(redirect_page,tar_acc_pin,tar_amt_pin) {


    if(redirect_page){
        // the call came from the frontend - first redirect and validate the pin then transfer

        let tar_acc = document.getElementById("taracc").value;
        let tar_amt = document.getElementById("useramount").value;

        let int_amt = parseInt(tar_amt);
        
        if(tar_acc == "" || tar_amt == "" || int_amt <= 0) {
            
            showToast("please enter valid details!!");

        }
        else if(useracc_trans == tar_acc) {

            showToast("Cannot transfer to your own account!!");

        }
        else {
            // valid data

            // now get the user balance
            let url = "http://localhost:8080/check_balance?accno=" + useracc_trans;
        
            fetch(url, {
                method: 'get'
            })
            .then(response => response.text())
            .then(data => {
                //succesfully fetched user balance
                let bal = parseFloat(data);
                if(bal >= tar_amt) {
                    //user had enough bal to transfer

                    //now check whether dest user exists or not
                    url = "http://localhost:8080/check_accno?accno=" + tar_acc;

                    //get method - pass acc within url
                    fetch(url, {
                        method: 'get'
                    })
                    .then(response => response.text())
                    .then(data => {
                        if(data == "true") {
                            //dest acc is present - now we can start the transaction
                            
                            let action = "transfer"
                            window.location.href = "pin.html?accno=" + useracc_trans + "&action=" + action   + "&tar_acc=" + tar_acc + "&amount=" + tar_amt;

                        }
                        else {
                            showToast("Destination account not existing !!");
                        }


                    })

                    .catch(error => {
                        showToast("error in checking the presence of destination user !!");
                    });



                }
                else{
                    showToast("Insufficient balance !!");
                }

            })

            .catch(error => {
                showToast("error in fetching the user balance !!");
            });

        }
    }
    else{ // redirect_page == False
        //hoo the call came from the pin page after succesffull validateion - now no reidrection needed - only thins is to trranfer
        //all the detatils for transfer is passed by pin page which are passed by ours


        // 1.debit from cur user 
        let url = "http://localhost:8080/withdrawl";

        //as we are updating an attribute it is patch - pass input accno and withdrawal amt as body
        let userdata = {
            accno: useracc_trans,
            amount: tar_amt_pin
        };

        fetch(url, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
        })
        .then(response => response.text())
        .then(data => {
            // withdrawal is successful

            //---- now deposit the amount in the tar acc----
            url = "http://localhost:8080/deposit";

            //as we are updating a attribute - this is patch - pass input in body
            userdata = {// deposit into tar account
                accno: tar_acc_pin,
                amount: tar_amt_pin
            };

            fetch(url, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userdata)
            })
            .then(response => response.text())
            .then(data => {
                // successfully credited the amt in tar acc

                // we are done with the transaction - debited from user and credited into tar acc
                showToast("Transaction successful !!",1000);



                let url = "http://localhost:8080/transaction_registration";

                //record 1
                let transdata = {
                    accno: useracc_trans,
                    tar_acc: tar_acc_pin,
                    amount: tar_amt_pin,
                    transaction_type: "debit"
                };

                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(transdata)
                })
                .then(response => response.text())
                .then(data => {
                    setTimeout(() => {
                        showToast(data.substring(0,18)+" 1 "+data.substring(18),1000)
                    }, 1000);

                    //we are done creating record 1 ,now create record 2


                    transdata = {
                        accno: tar_acc_pin,
                        tar_acc: useracc_trans,
                        amount: tar_amt_pin,
                        transaction_type: "credit"
                    };

                    fetch(url, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(transdata)
                    })
                    .then(response => response.text())
                    .then(data => {

                        setTimeout(() => {
                            showToast(data.substring(0,18)+" 2 "+data.substring(18),1000)
                        }, 2000);

                        //we are done..
                        setTimeout(() => {
                            window.location.href = "dashboard.html?accno=" + useracc_trans;
                        }, 3000);

                    })


                    .catch(error => {
                        showToast("error in creating the 2nd transaction record !!");
                    });



                })

                .catch(error => {
                    showToast("error in creating the 1st transaction record !!");
                });






                // setTimeout(() => {
                //     window.location.href = "dashboard.html?accno=" + useracc_trans;
                // }, 2000);

            })

            .catch(error => {
                showToast("error in crediting amount from user !!");
            });

        })

        .catch(error => {
            showToast("error in withdrawing amount from user !!");
        });           


    }//else


}

   

                         

                            

                                

//                                 // once the transaction is successful - we would create a transaction record
//                                 // it is a post http request - where we send the data in the body

//                                 // record - 1
//                                 let url = "http://localhost:8080/transaction_registration";

//                                 let transdata = {
//                                     accno: useracc_trans,
//                                     _pin: tar_acc,
//                                     amount: tar_amt_pin,
//                                     transaction_type: "debit"
//                                 };

//                                 fetch(url, {
//                                     method: 'POST',
//                                     headers: {
//                                         "Content-Type": "application/json"
//                                     },
//                                     body: JSON.stringify(transdata)
//                                 })
//                                 .then(response => response.text())
//                                 .then(data => {
//                                     showToast(data);

//                                     // record - 2
//                                     transdata = {
//                                         accno: tar_acc,
//                                         tar_acc: useracc_trans,
//                                         amount: tar_amt,
//                                         transaction_type: "credit"
//                                     };

//                                     fetch(url, {
//                                         method: 'POST',
//                                         headers: {
//                                             "Content-Type": "application/json"
//                                         },
//                                         body: JSON.stringify(transdata)
//                                     })
//                                     .then(response => response.text())
//                                     .then(data => {
//                                         showToast(data);
//                                         //we are done two records
//                                     })
//                                     .catch(error => {
//                                         showToast("error in creating 2nd transaction record !!");
//                                     });
//                                 })//record 1
//                                 
//                             })// then -> data
//                             .catch(error => {
//                                 showToast("error in crediting amount to target account !!");

//                                 //hoo the money has debited from user account but not credited to the target account
                                

//                                 //credit tar_amt to useracc_trans
//                                 //this is patch http request as we are modifying the data
//                                 url = "http://localhost:8080/deposit";

//                                 let rollbackData = {
//                                     accno: useracc_trans,
//                                     amount: tar_amt
//                                 };

//                                 fetch(url, {
//                                     method: 'PATCH',
//                                     headers: {
//                                         "Content-Type": "application/json"
//                                     },
//                                     body: JSON.stringify(rollbackData)
//                                 })
//                                 .then(() => {
//                                     showToast("Transaction failed! Amount rolled back to your account.");
//                                 })
//                                 .catch(() => {
//                                     showToast("Critical error! Please contact support.");
//                                 });
//                             });
//                         })
                        
//                     } 
//                 })
               
//             } 
//         })
        
//     }
// }