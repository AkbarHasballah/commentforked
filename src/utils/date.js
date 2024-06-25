function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}
function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari yang lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam yang lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit yang lalu`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} detik yang lalu`;
  }
  return 'baru saja';
}

function formatDate(date) {
  if (!date) return ''; // Mengembalikan string kosong jika date null atau undefined

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('id-ID', options);
}

export { getRandomDate, postedAt, formatDate };
