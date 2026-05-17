package model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;
    
    private String uname;
    private Integer age;
    private String city;
    private String phonenumber;
    private String password;
    private String accno;
    private String pin;
    private Double balance;
    
    public User() {}
    
    public User(String uname, Integer age, String city, String phonenumber,String password) {
        this.uname = uname;
        this.age = age;
        this.city = city;
        this.phonenumber = phonenumber;
        this.password = password;
        this.balance = 0.00;
        
    }
    
    // Getters
    public Long getUserid() { return userid; }       // ✅ Long
    public String getUname() { return uname; }
    public Integer getAge() { return age; }
    public String getCity() { return city; }
    public String getPhonenumber() { return phonenumber; }
    public String getPassword() { return password; }
    public String getAccno() { return accno; }
    public String getPin() { return pin; }
    public Double getBalance() { return balance; }
    
    // Setters
    public void setUserid(Long userid) { this.userid = userid; }  // ✅ Long
    public void setUname(String uname) { this.uname = uname; }
    public void setAge(Integer age) { this.age = age; }
    public void setCity(String city) { this.city = city; }
    public void setPhonenumber(String phonenumber) { this.phonenumber = phonenumber; }
    public void setPassword(String password) { this.password = password; }
    public void setAccno(String accno) { this.accno = accno; }
    public void setPin(String pin) { this.pin = pin; }
    public void setBalance(Double balance) { this.balance = balance; }
}