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
    e.preventDefault();
  
    //Get Form Values
    let startTime = String(document.getElementById("startDate").value) + " " + String(document.getElementById("clockStartTime").value);
    let offTime = String(document.getElementById("clockOffTime").value);
    //let offTime = String(document.getElementById("offDate").value) + " " + String(document.getElementById("clockOffTime").value);
    let SalaryPerHour = document.getElementById("SalaryPerHour").value;




    //Save Form Data To Firebase
    db.doc()
      .set({
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

    
  });

  function clearForm() {
    document.getElementById("clearForm").reset();
}


function showAllRecord(){
    var sT,oT,Salary;
    firestore
        .collection("testData")
        .get()
        .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            sT = doc.data().startTime;
            oT = doc.data().offTime;
            Salary = doc.data().SalaryPerHour;
            document.getElementById("showdata").innerHTML = document.getElementById("showdata").innerHTML 
            + "<a>" + sT + " - " + oT + "   Total Hours: " + "xx" + "   Salary: " + Salary + "</a><br>"
        // console.log("data", doc.data().fname);
        });
    });

   

}
