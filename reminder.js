document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reminderForm');
  const output = document.getElementById('output');
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('reminderDate').setAttribute('min', today);

  const saved = JSON.parse(localStorage.getItem('longTermReminder'));
  if (saved) {
    const now = new Date();
    const remindDate = new Date(saved.date);
    if (now >= remindDate) {
      output.textContent = "🔔 Reminder:

" + saved.reminder;
      output.classList.remove('hidden');
    } else {
      const daysLeft = Math.ceil((remindDate - now) / (1000 * 60 * 60 * 24));
      output.textContent = `⏰ Your reminder is set. ${daysLeft} day(s) left.`;
      output.classList.remove('hidden');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const reminder = document.getElementById('reminder').value;
    const reminderDate = document.getElementById('reminderDate').value;
    if (!reminder || !reminderDate) return;

    const data = { reminder, date: reminderDate };
    localStorage.setItem('longTermReminder', JSON.stringify(data));
    alert("Your reminder has been saved.");
    form.reset();
    output.classList.add('hidden');
  });
});
