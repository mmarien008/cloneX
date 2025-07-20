
export default  function remplissageDate() {

    const daySelect = document.getElementById('day');
    daySelect.innerHTML = '<option value="">Jour</option>';
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement('option');
      option.value = i.toString().padStart(2, '0');
      option.textContent = i;
      daySelect.appendChild(option);
    }
  
    const monthSelect = document.getElementById('month');
    monthSelect.innerHTML = '<option value="">Mois</option>';
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = (index + 1).toString().padStart(2, '0');
      option.textContent = month;
      monthSelect.appendChild(option);
    });
  
    const yearSelect = document.getElementById('year');
    yearSelect.innerHTML = '<option value="">Année</option>';
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
      const option = document.createElement('option');
      option.value = y;
      option.textContent = y;
      yearSelect.appendChild(option);
    }
  }
  