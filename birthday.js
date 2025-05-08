document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('birthdayForm');
  const output = document.getElementById('output');
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('birthdayDate').setAttribute('min', today);

  const savedData = JSON.parse(localStorage.getItem('birthdayLetter'));
  if (savedData) {
    const now = new Date();
    const unlockDate = new Date(savedData.date);
    if (now >= unlockDate) {
      output.textContent = "🎉 Your birthday letter:

" + savedData.letter;
      output.classList.remove('hidden');
    } else {
      const daysLeft = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24));
      output.textContent = `🎁 Your letter is hidden. ${daysLeft} day(s) left until your birthday!`;
      output.classList.remove('hidden');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const letter = document.getElementById('letter').value;
    const birthdayDate = document.getElementById('birthdayDate').value;
    if (!letter || !birthdayDate) return;

    const data = { letter, date: birthdayDate };
    localStorage.setItem('birthdayLetter', JSON.stringify(data));
    alert("Your birthday letter has been saved. Come back on your birthday to read it!");
    form.reset();
    output.classList.add('hidden');
  });
});
