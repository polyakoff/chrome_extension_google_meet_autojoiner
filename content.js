// content.js
chrome.storage.local.get('rows', ({ rows }) => {
  if (!rows) return;

  const currentUrl = window.location.href;

  for (const row of rows) {
    const trimmedRowUrl = row[0].replace(/https?:\/\//, '').trim(); // Remove "http://" or "https://" and trim spaces
    if (row.length >= 3 && currentUrl.includes(trimmedRowUrl)) {
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
  let attempts = 0;

  const attemptButtonClick = () => {
    attempts++;
    const joinButton = findButtonByText('Приєднатися зараз') || findButtonByText('Надіслати запит на приєднання');

    if (joinButton) {
      console.log('Join button found:', joinButton);
      joinButton.click();
      console.log('Join button clicked');
    } else {
      console.log('Join button not found');
    }

    if (attempts < 3) {
      setTimeout(attemptButtonClick, 1000);
    }
  };

  // Set a timeout before starting the button clicking attempts
  setTimeout(attemptButtonClick, 1000); // 1000 milliseconds (1 second)
}