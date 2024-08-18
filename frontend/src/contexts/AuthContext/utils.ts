export function setTokenLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function getTokenLocalStorage() {
  const json = localStorage.getItem("token");

  if (!json) {
    return null;
  }

  const token = json;

  return token ?? null;
}
