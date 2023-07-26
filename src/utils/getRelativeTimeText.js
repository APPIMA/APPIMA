const getRelativeTimeText = (timeInSeconds) => {
  const secondsPerMinute = 60;
  const secondsPerHour = 3600;
  const secondsPerDay = 86400;
  const secondsPerMonth = 2592000;
  const secondsPerYear = 31536000;

  if (timeInSeconds < 0) {
    return "En el futuro";
  }

  if (timeInSeconds < 1) {
    return "Ahora mismo";
  }

  if (timeInSeconds < secondsPerMinute) {
    return `Hace ${timeInSeconds} segundos`;
  }

  if (timeInSeconds < secondsPerHour) {
    const minutes = Math.floor(timeInSeconds / secondsPerMinute);
    return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }

  if (timeInSeconds < secondsPerDay) {
    const hours = Math.floor(timeInSeconds / secondsPerHour);
    return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }

  if (timeInSeconds < secondsPerMonth) {
    const days = Math.floor(timeInSeconds / secondsPerDay);
    return `Hace ${days} ${days === 1 ? "día" : "días"}`;
  }

  if (timeInSeconds < secondsPerYear) {
    const months = Math.floor(timeInSeconds / secondsPerMonth);
    return `Hace ${months} ${months === 1 ? "mes" : "meses"}`;
  }

  const years = Math.floor(timeInSeconds / secondsPerYear);
  return `Hace ${years} ${years === 1 ? "año" : "años"}`;
}

export default getRelativeTimeText;
