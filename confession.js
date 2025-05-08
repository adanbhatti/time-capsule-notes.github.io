document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('confessionForm');
  const output = document.getElementById('output');

  const saved = JSON.parse(localStorage.getItem('anonymousConfessions')) || [];

  if (saved.length > 0) {
    output.classList.remove('hidden');
    output.innerHTML = "<h3>📜 Previous Anonymous Confessions:</h3><ul>" +
      saved.map(conf => "<li>" + conf + "</li>").join("") + "</ul>";
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const confession = document.getElementById('confession').value;
    if (!confession) return;

    saved.push(confession);
    localStorage.setItem('anonymousConfessions', JSON.stringify(saved));
    alert("Your anonymous confession has been saved.");
    form.reset();
    output.innerHTML = "<h3>📜 Previous Anonymous Confessions:</h3><ul>" +
      saved.map(conf => "<li>" + conf + "</li>").join("") + "</ul>";
    output.classList.remove('hidden');
  });
});
