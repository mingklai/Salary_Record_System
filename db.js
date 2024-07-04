//Unique Firebase Object
const firebaseConfig = {
    apiKey: "AIzaSyArX70jSDxA7eBzdsJsQglPSskQvUNOM98",
    authDomain: "salary-record-system.firebaseapp.com",
    databaseURL: "https://salary-record-system-default-rtdb.firebaseio.com",
    projectId: "salary-record-system",
    storageBucket: "salary-record-system.appspot.com",
    messagingSenderId: "969640569674",
    appId: "1:969640569674:web:90ce83b74f51e35fed6fb3",
    measurementId: "G-L1FBD1KEMB"
  };
  
  //Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();
  
  //Variable to access database collection
  const db = firestore.collection("testData");
  
  //Get Submit Form
  let submitButton = document.getElementById("submit");
  
  //Create Event Listener To Allow Form Submission
  submitButton.addEventListener("click", (e) => {
    //Prevent Default Form Submission Behavior
    if(true){
      e.preventDefault();
  
      //Get Form Values
      let date = String(document.getElementById("date").value);
      let startTime = String(document.getElementById("clockStartTime").value);
      let offTime = String(document.getElementById("clockOffTime").value);
      //let offTime = String(document.getElementById("offDate").value) + " " + String(document.getElementById("clockOffTime").value);
      let SalaryPerHour = document.getElementById("SalaryPerHour").value;
  
  
  
  
      //Save Form Data To Firebase
      db.doc()
        .set({
          date: date,
          startTime: startTime,
          offTime: offTime,
          SalaryPerHour: SalaryPerHour,
        })
        .then(() => {
          console.log("add record to database Successfully");
          alert("Your Form Has Been Submitted Successfully");
          clearForm();
         })
        .catch((error) => {
          console.log(error);
          alert("!!!Error!!! Please Contact MK!")
        });
  
    }
    
    
  });

  function clearForm() {
    document.getElementById("clearForm").reset();
}


function showAllRecord(){
    document.getElementById("all_data").innerHTML = "<tr><th>日期</th><th>返工</th><th>收工</th><th>時數</th><th>時薪</th><th>當天人工</th></tr></tr>";

    var d,sT,oT,Salary;
    var totalMin = 0;
    var totalSalary = 0;
    firestore
        .collection("testData")
        .get()
        .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            d = doc.data().date;
            sT = doc.data().startTime;
            oT = doc.data().offTime;
            Salary = doc.data().SalaryPerHour;

            var sHour = Number(sT.substring(0,2));
            var sMin = Number(sT.substring(3,6));
            var oHour = Number(oT.substring(0,2));
            var oMin = Number(oT.substring(3,6));
            var dayHour = Math.floor(((oHour*60 + oMin) - (sHour*60 + sMin))/60);
            var dayMin = ((oHour*60 + oMin) - (sHour*60 + sMin))%60;
            var daySalary = (dayHour + (dayMin/60)) * Salary;
            totalMin = totalMin + dayHour*60 + dayMin;
            totalSalary = totalSalary + daySalary;
            document.getElementById("all_data").innerHTML = document.getElementById("all_data").innerHTML
            + "<tr>" 
            + "<td>" + d + "</td>" 
            + "<td>" + sT + "</td>" 
            + "<td>" + oT + "</td>"
            + "<td>" + dayHour + "h " + dayMin  + "m" + "</td>"
            + "<td>" + Salary + "</td>"
            + "<td>" + daySalary + "</td>"
            + "</tr>";
        });
        var totalshowHour = Math.floor((totalMin/60));
        var totalshowMin = totalMin%60;
        document.getElementById("all_data").innerHTML = document.getElementById("all_data").innerHTML 
        + "<tr>" 
            + "<td>" + "-" + "</td>" 
            + "<td>" + "-" + "</td>" 
            + "<td>" + "Total" + "</td>"
            + "<td style=\"color:red;\">" + totalshowHour + "h " + totalshowMin  + "m" +  "</td>"
            + "<td>" + "Total" + "</td>"
            + "<td style=\"color:red;\">" + totalSalary + "</td>"
            + "</tr>";

    });

   

}

// function checkForm(){
//   console.log("runnning checkForm");
//   console.log(String(document.getElementById("date")));
//   console.log(String(document.getElementById("clockStartTime")));
//   console.log(String(document.getElementById("clockEndTime")));
//   console.log(String(document.getElementById("SalaryPerHour")));

//   if(String(document.getElementById("date")) == null){
//       alert("未入日期");
//       return false;
//   }
//   if(String(document.getElementById("clockStartTime")) == null){
//       alert("未入返工時間");
//       return false;
//   }
//   if(String(document.getElementById("clockEndTime")) == null){
//       alert("未入返工時間");
//       return false;
//   }
//   if(String(document.getElementById("SalaryPerHour")) == null){
//       alert("未入時薪");
//       return false;
//   }
//   //if(sT !> oT)
//   return true
// }