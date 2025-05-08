document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('messageForm');
  const output = document.getElementById('output');
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('unlockDate').setAttribute('min', today);

  const savedData = JSON.parse(localStorage.getItem('futureMessage'));
  if (savedData) {
    const now = new Date();
    const unlockDate = new Date(savedData.date);
    if (now >= unlockDate) {
      output.textContent = "Your message to your future self:

" + savedData.message;
      output.classList.remove('hidden');
    } else {
      const daysLeft = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24));
      output.textContent = `Your message is locked. ${daysLeft} day(s) left until you can read it.`;
      output.classList.remove('hidden');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const unlockDate = document.getElementById('unlockDate').value;
    if (!message || !unlockDate) return;

    const data = { message, date: unlockDate };
    localStorage.setItem('futureMessage', JSON.stringify(data));
    alert("Your message has been saved. Come back on your chosen date to read it.");
    form.reset();
    output.classList.add('hidden');
  });
});
