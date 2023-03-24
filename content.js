// content.js
chrome.storage.local.get('rows', ({ rows }) => {
  if (!rows) return;

  const currentUrl = window.location.href;

  for (const row of rows) {
    if (row.length >= 3 && currentUrl.includes(row[0])) {
      const message = row[1] + " — " + row[2];
      const messageDiv = document.createElement('div');
      messageDiv.innerText = message;
      messageDiv.style.backgroundColor = 'rgba(0, 128, 0, 0.5)';
      messageDiv.style.color = 'white';
      messageDiv.style.padding = '5px';
      messageDiv.style.position = 'fixed';
      messageDiv.style.top = '0';
      messageDiv.style.left = '0';
      messageDiv.style.zIndex = '9999';
      messageDiv.style.fontWeight = 'bold';
      document.body.appendChild(messageDiv);
      break;
    }
  }

  // Check if the current URL is a Google Meet link
  if (currentUrl.includes('https://meet.google.com/')) {
    joinGoogleMeet();
  }
});

function findButtonByText(text) {
  const buttonElements = document.querySelectorAll('button, input[type="button"], input[type="submit"], div[role="button"]');

  for (const button of buttonElements) {
    if (button.textContent.trim() === text) {
      return button;
    }
  }

  return null;
}

function joinGoogleMeet() {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const joinButton = findButtonByText('Приєднатися зараз');
        if (joinButton) {
          console.log('Join button found:', joinButton);
          joinButton.click();
          console.log('Join button clicked');
          observer.disconnect();
          return;
        } else {
          console.log('Join button not found yet');
        }
      }
    }
  });

  // Set a timeout before starting the observer
  setTimeout(() => {
    observer.observe(document.body, { childList: true, subtree: true });
  }, 1000); // 1000 milliseconds (1 second)
}