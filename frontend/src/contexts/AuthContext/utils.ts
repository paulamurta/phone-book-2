export function setTokenLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function setUserNameLocalStorage(name: string) {
  localStorage.setItem("userName", name);
}

export function setUserEmailLocalStorage(email: string) {
  localStorage.setItem("userEmail", email);
}

export function setUserIdLocalStorage(id: string) {
  localStorage.setItem("userId", id);
}

export function getTokenLocalStorage() {
  const json = localStorage.getItem("token");

  if (!json) {
    return null;
  }

  const token = json;

  return token ?? null;
}
