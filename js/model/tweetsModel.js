export default class TweetModel {
    static async getTweets() {
        const response = await fetch(`http://localhost:3000/tweets`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
  
      if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs');
      const data = await response.json();
      console.log(data);
      
      return data;
  
    }

  
    static async createTweets(content, userId,photo) {

      if (photo!="") {

        
      }
      const response = await fetch('http://localhost:3000/tweets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content,
           "likes":0,
            "retweets":0, 
            "replies": [0],
            userId,
            "media":photo,
            createdAt: new Date().toISOString()}),
      });
  
      if (!response.ok) throw new Error('Erreur lors de la création de l\'utilisateur');
  
      return await response.json();
    }

    static async showTweet(userId) {
      try {
        const response = await fetch(`http://localhost:3000/tweets?userId=${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tweets = await response.json();
        return tweets;
      } catch (error) {
        console.error('Erreur lors de la récupération des tweets:', error);
        return null;
      }
    }
    
  
    static async updateTweets(userId, data) {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH', // ou 'PUT' selon le cas
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // data est un objet avec les champs à mettre à jour
      });
  
      if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
  
      return await response.json();
    }
  
  }
  