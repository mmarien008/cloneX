
import TweetModel from '../model/tweetsModel.js';



export default class TweetController {


    static async create(contentId,userId,photoId) {

        // reccuperation des champs
        const content = document.querySelector(contentId).value.trim();

        let imageBase64="";

        let photo = document.querySelector(photoId);
    
        if (!photo) {
          imageBase64 = "";
          suiteDuTraitement(); 
        } else {
          const file = photo.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
              imageBase64 = e.target.result;
              console.log("Image base64 :", imageBase64); 
              suiteDuTraitement(); 
            };
            reader.readAsDataURL(file);
          }
        }
        
        //traitement
        function suiteDuTraitement() {
          if (!content) {
            alert("Veuillez remplir le champ !");
            return;
          }
          imageBase64 = "";
        
          try {
            TweetModel.createTweets(content, userId, imageBase64);
            alert("Le tweet est posté avec succès !");
          } catch (error) {
            alert("Erreur lors de la création : " + error.message);
          }
        }
        


    }


    static delete() {
        
    }

}


