
  const centerDiv = document.querySelector(".center");
  const rainCount = 59; // Adjust the number of raindrops

  for (let i = 0; i < rainCount; i++) {
    const rainDiv = document.createElement("div");
    rainDiv.className = "rain";
    rainDiv.style.top = `${Math.random() * -100}%`;
    rainDiv.style.left = `${Math.random() * 100}%`;
    rainDiv.style.setProperty("--delay", `${Math.random() * 2}s`);
    rainDiv.style.setProperty("--duration", `${1.5 + Math.random()}s`);
    centerDiv.appendChild(rainDiv);
  }
