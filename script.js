const firebaseConfig = {
  apiKey: "AIzaSyAAcJmxRgMma8_-8Jk-zI6LitQYlHwJ2pY",
  authDomain: "sandykala-b0e5d.firebaseapp.com",
  databaseURL: "https://sandykala-b0e5d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sandykala-b0e5d",
  storageBucket: "sandykala-b0e5d.firebasestorage.app",
  messagingSenderId: "699883331602",
  appId: "1:699883331602:web:dbc316da8db015c10e78cb",
  measurementId: "G-F5V8WVCSVD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()



function pushDatabase() {
 nama = document.getElementById("name").value
 rating = document.getElementById("rating").value
 message = document.getElementById("message").value
 var dbRef = database.ref(nama);
dbRef.set({
  message: message,
  rating: rating
}).then(function() {
  console.log("Data saved successfully!", nama);
}).catch(function(error) {
  console.error("Error writing data:", error);
});
}

firebase.database().ref('/').on('value', (snapshot) => {
  console.log(snapshot.val());
});



const dataTableBody = document.querySelector('#data-table tbody');

firebase.database().ref('/').on('value', (snapshot) => {
  const data = snapshot.val();

  // Clear previous data
  dataTableBody.innerHTML = '';

  // Check if data exists
  if (data) {
    // Iterate over the data and create table rows
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const item = data[key];

        // Create a table row
        const row = document.createElement('tr');

        // Create table data cells for key and value
        const nameCell = document.createElement('td');
        nameCell.textContent = key;

        const messageCell = document.createElement('td');
        messageCell.textContent = item["message"];

        const ratingCell = document.createElement('td');
        ratingCell.textContent = item["rating"];

        // Append cells to the row
        row.appendChild(nameCell);
        row.appendChild(messageCell);
        row.appendChild(ratingCell);

        // Append the row to the table body
        dataTableBody.appendChild(row);
      }
    }
  } else {
    // Display a message if no data is available
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.setAttribute('colspan', '2');
    cell.textContent = 'No data available';
    row.appendChild(cell);
    dataTableBody.appendChild(row);
  }
});