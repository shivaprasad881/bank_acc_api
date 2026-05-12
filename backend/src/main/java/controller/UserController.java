package controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import model.User;
import repository.TransactionRepository;
import repository.UserRepository;
import java.util.Map;
import model.Transaction;

import java.util.List;


@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping("/register")
    public String register(@RequestBody Map<String, Object> jsonBody) {

        String uname = (String) jsonBody.get("uname");
        Integer age = Integer.parseInt((String) jsonBody.get("age"));
        String city = (String) jsonBody.get("city");
        String phonenumber = (String) jsonBody.get("phonenumber");

        User newUser = new User(uname, age, city, phonenumber);
        User savedUser = userRepository.save(newUser);

        String accno = "ACC" + String.format("%08d", savedUser.getUserid());
        String pin = String.format("%04d", savedUser.getUserid() % 10000);
        
        savedUser.setAccno(accno);
        savedUser.setPin(pin);
        userRepository.save(savedUser);

        return "Account Number: " + accno + " | PIN: " + pin;
    } 



    @PostMapping("/transaction_registration")
    public String transaction_registration(@RequestBody Map<String, Object> jsonBody) {

        String accno = (String) jsonBody.get("accno");
        String tar_acc = (String) jsonBody.get("tar_acc");

        Double amount = Double.parseDouble(jsonBody.get("amount").toString());
        String transaction_type = (String) jsonBody.get("transaction_type");

        Transaction newtransaction = new Transaction(accno,tar_acc,amount,transaction_type);

        

        
        transactionRepository.save(newtransaction);

        return "Transaction record created successfully !!";
    } 



    @GetMapping("/check")
    public String check(@RequestParam String accno, @RequestParam String pin) {
        User user = userRepository.findByAccnoAndPin(accno, pin);

        if(user == null){
            return "false";
        }
        else{
            return "true";
        }
    }

    @GetMapping("/check_accno")
    public String checkAccno(@RequestParam String accno) {
        User user = userRepository.findByAccno(accno);

        if(user==null){
            //the user is not present
            return "false";
        }
        else{
            return "true";
        }
        
    }

    @GetMapping("/check_balance")
    public String checkBalance(@RequestParam String accno) {
        User user = userRepository.findByAccno(accno); //we are finding the user record based on the user accno - once we got the user record we can fetechand update any of the fields of that user

        return ""+user.getBalance();
    }

    @GetMapping("/user_details")
    public String userdetails(@RequestParam String accno) {
        User user = userRepository.findByAccno(accno);

        
         return user.getUname() + "," + user.getAge() + "," + user.getCity()  + "," +  user.getPhonenumber()    + "," + user.getBalance() ;
    }

    @GetMapping("/user_transactions")
    public List<Transaction> user_transactions(@RequestParam String accno) {
        List<Transaction> transactions = transactionRepository.findByAccno(accno);

         return transactions;
    }

    @GetMapping("/validatepin")
    public String validatepin(@RequestParam String accno,@RequestParam String user_pin) {
        User user = userRepository.findByAccno(accno);

        String orig_pin = user.getPin();

        if( orig_pin.equals(user_pin) ){
            //the original pin and user entered old pin are same
            return "true";
        }
        else{
            return "false"; //invalid pin
        }
         
    }


    @PatchMapping("/updatepin") 
        public String updatePin(@RequestBody Map<String, Object> jsonBody) {
            String accno = (String) jsonBody.get("accno");
            String newpin = (String) jsonBody.get("newpin");
            // fill your code here
            User user = userRepository.findByAccno(accno);

            //now we got the record - just update the pin by using setter
            user.setPin(newpin);
            userRepository.save(user);

            return "pin updated successfully!!";
            
        }


    @PatchMapping("/deposit")
        public String deposit(@RequestBody Map<String, Object> jsonBody) {
            String accno = (String) jsonBody.get("accno");
            Double amt = Double.parseDouble((String) jsonBody.get("amount"));

            
            User user = userRepository.findByAccno(accno);

            
            user.setBalance( user.getBalance() + amt );

            userRepository.save(user);

            return "Amount deposited succesfully!!";
            
        }



    @PatchMapping("/withdrawl")
        public String withdrawl(@RequestBody Map<String, Object> jsonBody) {
            String accno = (String) jsonBody.get("accno");
            Double amt = Double.parseDouble((String) jsonBody.get("amount"));

            
            User user = userRepository.findByAccno(accno);
            
            if(user.getBalance()<amt){
                return "Insuffient balance!!";
            }
            else{
                user.setBalance( user.getBalance() - amt );

                userRepository.save(user);

                return "Amount Withdrawl succesfully!!";
            }
            
            
        }

}