import UserModel from '../model/userModel.js';

export default class AuthController {

  static logout() {
    // les code pour la deconnexion
    localStorage.removeItem('user');
    window.location.href = "auth/login.html"; 
  }


  static async login (passwordId,emails) {
    // les codes pour la connexion
    const password = document.querySelector(passwordId).value.trim();
    console.log(emails,password);
    const email=emails;
    if (!password) {
      alert("Veuillez remplir le champ !");
        return;
      }
    if (!email) {
      alert("Aucun email trouvé, veuillez vous reconnecter.");
        return;
      }
      try {
    
          const users = await UserModel.getUsers();
          const user = users.find(u => u.email === email && u.password === password);


          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            alert("Connexion réussie !");
            window.location.href = "../timeline.html"; 
         
          } else {
            alert("Email ou mot de passe incorrect.");
          }
    
        } catch (error) {
          console.error(error);
          alert("Erreur lors de la connexion.");
        }
      };
    
  
 
}
