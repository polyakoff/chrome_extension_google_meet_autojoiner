// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const dataInput = document.getElementById('dataInput');
  const saveDataBtn = document.getElementById('saveData');

  saveDataBtn.addEventListener('click', () => {
    const data = dataInput.value.trim();
    const rows = data.split(/\n/).map(row => row.split(/\t/));
    chrome.storage.local.set({ rows }, () => {
      alert('Data saved successfully');
    });
  });
});