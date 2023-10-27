const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.textContent = "Click to install!";
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt = null;
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed!";
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  butInstall.textContent = "Successfully installed!";
  console.log("👍", "appinstalled", event);
});
