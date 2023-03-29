// Api url
const apiUrl = "https://reqres.in/api/users/";

let userList = document.getElementById("user-list");

// hämtar datan från apin
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // En for loop som loopar genom users och lägger till de i userlist
    for (let i = 0; i < data.data.length; i++) {
      let user = data.data[i];

      // skapa en user
      let userElement = document.createElement("div");
      userElement.classList.add("user");
      userElement.innerHTML = `
        <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
        <h2>${user.first_name} ${user.last_name}</h2>
        <p>${user.email}</p>
      `;

      userElement.addEventListener("click", function () {
        // Hämtar data för user som man klickar på
        let userId = user.id;
        fetch(apiUrl + userId)
          .then((response) => response.json())
          .then((userData) => {
            // Skapa modalen med och visa user data
            let modal = document.createElement("div");
            modal.id = "modal";
            let modalContent = document.createElement("div");
            modalContent.id = "modal-content";
            modalContent.innerHTML = `
              <img class="user-image" src="${userData.data.avatar}" alt="${userData.data.first_name} ${userData.data.last_name}">
              <h2>${userData.data.first_name} ${userData.data.last_name}</h2>
              <p>${userData.data.email}</p>
              
            `;
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            modal.style.display = "block";
            currentModal = modal;

            //  en listener för att kunna stänga ner modalen
            let closeModalButton = document.getElementById("close-modal");
            closeModalButton.addEventListener("click", function () {
              modal.style.display = "none";
            });
          });
      });

      userList.appendChild(userElement);
    }
  });

// Ett click event där ifall man klickar utanför modalen så stängs den ner
document.addEventListener("click", function (event) {
  if (event.target == currentModal) {
    currentModal.style.display = "none";
  }
});
