

export default function isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
}