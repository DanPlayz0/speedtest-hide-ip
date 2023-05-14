function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
  await waitForElm(".ispComponent .result-data");
  let ipAddress = document.querySelector(".ispComponent .result-data").innerText;

  document.addEventListener('click', (e) => {
    if (e.srcElement.id == "ip-reveal-btn") {
      e.srcElement.parentNode.className += " ip-revealed";
      e.srcElement.parentNode.innerHTML = ipAddress;
    }
  });

  setInterval(() => {
    const ispComponentIP = document.querySelector(".ispComponent .result-data");
    if (ispComponentIP && !ispComponentIP.className.includes("ip-revealed") && ispComponentIP.innerText.includes(ipAddress)) {
      ispComponentIP.innerHTML = '<a id="ip-reveal-btn">Click to reveal</a>';
    }

    const resultDataIP = document.querySelector(".js-data-ip");
    if (resultDataIP && !resultDataIP.className.includes("ip-revealed") && resultDataIP.innerText.includes(ipAddress)) {
      resultDataIP.innerHTML = '<a id="ip-reveal-btn">Click to reveal</a>';
    }
  }, 10);
