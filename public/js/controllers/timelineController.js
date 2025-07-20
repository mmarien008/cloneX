
import TweetModel from '../model/tweetsModel.js';
import UserModel from '../model/userModel.js';


export default class timelineController {


    static async showsTweets() {

        // const userJson = localStorage.getItem('user');
        // if (!userJson) {
        //     console.error("Aucun utilisateur trouvé dans localStorage.");
        //     return;
        // }
        // const user = JSON.parse(userJson);
        // console.log(user);

        const blockTweets = document.querySelector("#tweets");

        const tweets = await TweetModel.getTweets();
        const users = await UserModel.getUsers();
      
        const usersById = {};
        users.forEach(u => { usersById[u.id] = u });
 
      
        const tweetsWithUser = tweets.map(t => {
          const u = usersById[t.userId] || {};

          return { ...t,username: u.username };
        });

   
        tweetsWithUser.forEach(tweet => {
          const date = new Date(tweet.createdAt);
          const options = { year: 'numeric', month: 'long' }; // Ex. : juillet 2025
          const formattedDate = date.toLocaleDateString('fr-FR', options);

          
            const tweetDiv = document.createElement("div");
            tweetDiv.className = "border-b flex p-4 border-b border-gray-700";
          
            tweetDiv.innerHTML = `
              <div class="w-12 h-12 rounded-full bg-gray-500 mr-3"></div>
              <div class="flex-1 flex flex-col">
                <div class="flex gap-2 text-sm">
                  <span class="font-bold text-white">${tweet.username || 'Nom Utilisateur'}</span>
                  <span class="text-gray-400">@${ 'cultureCrave'} · ${formattedDate } </span>
                </div>
                <p class="mt-1 text-white">${tweet.content || "Voici un tweet d'exemple avec du contenu textuel."}</p>
                ${tweet.media ? `
                <div class="mt-2 rounded-xl overflow-hidden">
                  <img src="${tweet.media}" alt="media" class="w-full object-cover" />
                </div>` : ''}
                <div class="flex justify-between mt-4 text-gray-400 text-sm">
                  <span>💬 ${tweet.retweets }</span>
                  <span>🔁 ${0}</span>
                  <span>❤️ ${0}</span>
                  <span>📤</span>
                </div>
              </div>
            `;
            blockTweets.appendChild(tweetDiv);

        });
    }


    static showName() {
        const nameUser = document.querySelector("#nameUser");
        const nameEmail = document.querySelector("#emailUser");
      
        let nom = JSON.parse(localStorage.getItem('user')).name;
        let email = JSON.parse(localStorage.getItem('user')).email;
      
        nameUser.innerHTML=nom.toString();
        nameEmail.innerHTML=email.toString();
      
        let photo = "";
      
    }

}


