export default class UserModel {

    static async getUsers() {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs');
  
      return await response.json();
    }
  
    static async createUser(username, email, password,date_of_birth) {
     
        
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name":"",
          username,
            email, 
            password,
            date_of_birth,
            "profilePicture":"",
            "bio":"",
            "location":"",
            "website":"",
            "followers":0,
            "following":0,
            createdAt: new Date().toISOString()}),
      });
  
      if (!response.ok) throw new Error('Erreur lors de la création de l\'utilisateur');
  
      return await response.json();
    }
  
    static async ShowUser(userId) {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'GET', // ou 'PUT' selon le cas
        headers: { 'Content-Type': 'application/json' } // data est un objet avec les champs à mettre à jour
      });
  
      if (!response.ok) throw new Error('Erreur lors de la reccuperation  de l\'utilisateur');
  
      return await response.json();
    }

    static async UpdateUser(userId,photo) {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH', // ou 'PUT' selon le cas
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "profilePicture":photo
          }),
      });
  
      if (!response.ok) throw new Error('Erreur lors de l\'actualisation  de l\'utilisateur');
  
      return await response.json();
    }
  
  }
  