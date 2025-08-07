function formattedDateTime(localTime) {
    const pad = (n) => n.toString().padStart(2, '0');

    const year = localTime.getUTCFullYear();
    const month = pad(localTime.getUTCMonth() + 1);
    const day = pad(localTime.getUTCDate());
    const hour = pad(localTime.getUTCHours());
    const minute = pad(localTime.getUTCMinutes());
    const second = pad(localTime.getUTCSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`; 
}

export function timestamp() {
    const now = new Date();

  // Jakarta offset = UTC+7, dalam ms
  const jakartaOffset = 7 * 60 * 60 * 1000;
  const localTime = new Date(now.getTime() + jakartaOffset - now.getTimezoneOffset() * 60 * 1000);

  const result = formattedDateTime(localTime);

  return result;

}