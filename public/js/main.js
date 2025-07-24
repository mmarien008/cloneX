import UserController from './controllers/userController.js';
import AuthController from './controllers/authController.js';
import timelineController from './controllers/timelineController.js';
import TweetController from './controllers/tweetController.js';
import remplissageDate from '../js/utils.js';
import isAuthenticated from '../js/middlewares/auth.js';

function router() {
  const path = window.location.href;

  if (path.includes("timeline")) {
    // Accès timeline nécessite authentification
    if (!isAuthenticated()) {
      window.location.href = "auth/login.html";
      return;
    }

    // Afficher tweets et nom utilisateur
    timelineController.showsTweets();
    timelineController.showName();

    // Gestion déconnexion
    const btnDeconnexion = document.querySelector("#deconnexion");
    if (btnDeconnexion) {
      btnDeconnexion.addEventListener("click", function (e) {
        e.preventDefault();
        AuthController.logout();
      });
    }

    // Création d'un nouveau tweet avec la photo
    const formCreate = document.querySelector("#createTweet-form");
    const uploadBtnT = document.querySelector("#uploadBtnT");
    const imageInputT = document.querySelector("#imageInputT");
    if (formCreate) {
      uploadBtnT.addEventListener('click', async ()=> {
        imageInputT.click();
        });
    
      formCreate.onsubmit = async (e) => {
        e.preventDefault();
        try {
          const userId = JSON.parse(localStorage.getItem('user')).id;
          TweetController.create('#content', userId,"#imageInputT");
          
        } catch (error) {
          console.error(error);
        }
      };
    }

  } else if (path.includes("login")) {
    // Si déjà connecté, rediriger vers timeline
    if (isAuthenticated()) {
      window.location.href = "../timeline.html";
      return;
    }

    // Formulaire d'entrée email
    const formEmail = document.querySelector("#auth_login");
    if (formEmail) {
      formEmail.onsubmit = (e) => {
        e.preventDefault();
        const email = document.querySelector("#email").value.trim();
        localStorage.setItem('email', email);
        window.location.href = "loginPassword.html";
      };
    }

    // Formulaire de connexion (mot de passe)
    const formPassword = document.querySelector("#auth_connect");
    if (formPassword) {
      formPassword.onsubmit = async (e) => {
        e.preventDefault();
        try {
          await AuthController.login("#password", localStorage.getItem('email'));
        } catch (error) {
          console.error(error);
        }
      };
    }

  } else if (path.includes("user/create")) {
    // Si déjà connecté, rediriger vers timeline
    // if (isAuthenticated()) {
    //   window.location.href = "../timeline.html";
    //   return;
    // }

    // Pré-remplissage date sur la page création compte
    remplissageDate();

    const formCreateUser = document.querySelector("#signup-form");
    if (formCreateUser) {
      formCreateUser.onsubmit = async (e) => {
        e.preventDefault();
        UserController.create('#username', '#email', '#password', '#confirmPassword', '#day', '#month', '#year');
      };
    }

  } else if (path.includes("user/profil")) {

    // Profil nécessite authentification
    if (!isAuthenticated()) {
      window.location.href = "auth/login.html";
      return;
    }

    //photo de profil prise de la photo de profil
    uploadBtn.addEventListener('click', async ()=> {
    fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      UserController.Updateprofile("#fileInput", "#uploadStatus");
    });
    
    
    // affiche info profil
    UserController.profile('#name', "#namear", "#following", "#followers", "#tweets","#photoProfil");

  } else {
    console.log("Page d'accueil ou page inconnue");
  }
}

document.addEventListener("DOMContentLoaded", router);
