
import UserModel from '../model/userModel.js';
import TweetModel from '../model/tweetsModel.js';


export default class UserController {


    static async create(nameId,addressMailId,passwordId,confirmPasswordId,dayId,monthId,yearId) {

        // reccuperation des champs
        const name = document.querySelector(nameId).value.trim();
        const email = document.querySelector(addressMailId).value.trim();
        const password = document.querySelector(passwordId).value;
        const confirmPassword = document.querySelector(confirmPasswordId).value;

        const day = document.querySelector(dayId).value.trim();
        const month = document.querySelector(monthId).value;
        const year = document.querySelector(yearId).value;

        // Formatage de la date
        const date_of_birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    
        // la validations

        if (!email || !name || !password ||!confirmPassword  ) {
          alert("Veuillez remplir tout champs!");
          return;
        }
        if (password && confirmPassword && password !== confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }

        if (!day || !month || !year) {
          alert("La date de naissance est obligatore");
          return;
        }

        // la creation de l'utilisateur
        try {
         
            await UserModel.createUser(name, email, password,date_of_birth);
            alert("Compte créé avec succès !");
            window.location.href = "../auth/login.html";

           
          } catch (error) {
            alert("Erreur lors de la création : " + error.message);
          }

    }


    static async profile(Elementname, Elementnametwo, Following, Followers, blocktweets,IdPhotoProfil) {
      const photoProfil = document.querySelector(IdPhotoProfil);

      
      // Sélection des éléments du DOM
      const nameElement = document.querySelector(Elementname);
      const nametwoelement = document.querySelector(Elementnametwo);
      const following = document.querySelector(Following);
      const followers = document.querySelector(Followers);
      const blockTweets = document.querySelector(blocktweets);
    
      try {
        // Récupération de l'id utilisateur depuis le localStorage
        const userId = JSON.parse(localStorage.getItem('user')).id;
    
        // Récupéreration les données utilisateur et les tweets
        const user = await UserModel.ShowUser(userId);
        const tweets = await TweetModel.showTweet(userId);

        console.log(user.profilePicture);
        photoProfil.style.backgroundImage = `url(${user.profilePicture})`;
        photoProfil.style.backgroundSize = "cover";
        photoProfil.style.backgroundPosition = "center";
        
    
        // Association du nom d'utilisateur à chaque tweet
        const tweetsWithUser = tweets.map(t => ({
          ...t,
          username: user.username
        }));
    
        // Affichage de chaque tweet dans blockTweets
        tweetsWithUser.forEach(tweet => {
          const date = new Date(tweet.createdAt);
          const options = { year: 'numeric', month: 'long' }; // Exemple : juillet 2025
          const formattedDate = date.toLocaleDateString('fr-FR', options);
    
          // Création du conteneur tweet
          const tweetDiv = document.createElement("div");
          tweetDiv.className = "border-b flex p-4 border-gray-700";
    
          // Construction du contenu HTML du tweet
          tweetDiv.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-gray-500 mr-3"></div>
            <div class="flex-1 flex flex-col">
              <div class="flex gap-2 text-sm">
                <span class="font-bold text-white">${tweet.username || 'Nom Utilisateur'}</span>
                <span class="text-gray-400">@cultureCrave · ${formattedDate}</span>
              </div>
              <p class="mt-1 text-white w-96 break-words">${tweet.content || "Voici un tweet d'exemple avec du contenu textuel."}</p>
              ${tweet.media ? `
                <div class="mt-2 rounded-xl overflow-hidden">
                  <img src="${tweet.media}" alt="media" class="w-full object-cover" />
                </div>` : ''}
              <div class="flex justify-between mt-4 text-gray-400 text-sm">
                <span>💬 ${tweet.retweets}</span>
                <span>🔁 0</span>
                <span>❤️ 0</span>
                <span>📤</span>
              </div>
            </div>
          `;
          // Ajout du tweet dans le conteneur principal
          blockTweets.appendChild(tweetDiv);
        });
    
        // Mise à jour des informations utilisateur dans la page
        const nomSansEspaces = user.username.replace(/\s+/g, '');
        const nomAro = `@${nomSansEspaces}`;
    
        nameElement.innerHTML = user.username;
        nametwoelement.innerHTML = nomAro;
        following.innerHTML = user.following;
        followers.innerHTML = user.followers;
    
      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
      }
    }
    static async Updateprofile(IdPhoto,IdstatutProfil) {

      let imageBase64="";

      const photo = document.querySelector(IdPhoto);
     

      const userId = JSON.parse(localStorage.getItem('user')).id;

      if (!photo) {
        imageBase64 = "";
        suiteDuTraitement(); 
      } else {
        const file = photo.files[0];
      
        
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            imageBase64 = e.target.result;
            suiteDuTraitement(); 
          };
          reader.readAsDataURL(file);
        }else{
          alert("ERREUR")
        }
      }
              //traitement
              function suiteDuTraitement() {
           
                try {
                  UserModel.UpdateUser(userId,imageBase64);
                  alert("La photo changee avec succes avec succès !");
                  window.location.href = "profil.html";

                  
                } catch (error) {
                  alert("Erreur lors de la mise a jour du profil : " + error.message);
                }
              }

      

      

    
      //const nameElement = document.querySelector(IdstatutProfil);
      //nameElement.classList.replace("hidden","none");
    }
    
}


