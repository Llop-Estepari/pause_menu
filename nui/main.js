const closeBtn = document.getElementById('close')
const optionsBtn = document.getElementById('settings')
const controlsBtn = document.getElementById('controls')
const mapBtn = document.getElementById('map')
const quitBtn = document.getElementById('quit')
const closeControlsBtn = document.getElementById('close-controls')

const playerIdLbl = document.getElementById('player-id')
const playersCountLbl = document.getElementById('player-count')

const instagramBtn = document.getElementById('instagram')
const youtubeBtn = document.getElementById('youtube')
const twitchBtn = document.getElementById('twitch')
const discordBtn = document.getElementById('discord')
const twitterBtn = document.getElementById('twitter')
const tiktokBtn = document.getElementById('tiktok')


window.addEventListener('message', (event) => {
  if (event.data.type === 'TOGGLE') {
    document.body.classList.toggle('hidden')
    playersCountLbl.innerHTML = event.data.playerCount
  }
  if (event.data.type === 'SETTINGS') {
    setSocialMedia(event.data.links)
    setColors(event.data.colors)
    setControls(event.data.controls)
    playerIdLbl.innerHTML = event.data.playerID
  }
})

function setControls(controls) {
  const controlParent = document.getElementById('controls-list')

  controls.forEach(control => {
    const controlDiv = document.createElement('div')
    const controlKeyDiv = document.createElement('div')
    const controlDescSpan = document.createElement('span')

    controlDiv.className = 'control'
    controlKeyDiv.textContent = control[0]
    controlDescSpan.textContent = control[1]

    controlDiv.appendChild(controlKeyDiv)
    controlDiv.appendChild(controlDescSpan)
    controlParent.appendChild(controlDiv)
  });
}


function setColors(colors) {
  document.documentElement.style.setProperty('--text-color', colors.TEXT)
  document.documentElement.style.setProperty('--bg-color', colors.BACKGROUND)
  document.documentElement.style.setProperty('--body-bg-color', colors.BODY_BG)
  document.documentElement.style.setProperty('--map-color', colors.MAP)
  document.documentElement.style.setProperty('--settings-color', colors.SETTINGS)
  document.documentElement.style.setProperty('--controls-color', colors.CONTROLS)
  document.documentElement.style.setProperty('--quit-color', colors.QUIT)
  // document.documentElement.style.setProperty('--bug-color', colors.BUG)
}

function setSocialMedia(links) {
  if (links.INSTAGRAM !== "") {
    instagramBtn.classList.remove('hidden')
    $(instagramBtn).click(function() {
      window.invokeNative('openUrl', links.INSTAGRAM)
    })
  }
  if (links.YOUTUBE !== "") {
    youtubeBtn.classList.remove('hidden')
    $(youtubeBtn).click(function() {
      window.invokeNative('openUrl', links.YOUTUBE)
    })
  }
  if (links.DISCORD !== "") {
    discordBtn.classList.remove('hidden')
    $(discordBtn).click(function() {
      window.invokeNative('openUrl', links.DISCORD)
    })
  }
  if (links.TWITCH !== "") {
    twitchBtn.classList.remove('hidden')
    $(twitchBtn).click(function() {
      window.invokeNative('openUrl', links.TWITCH)
    })
  }
  if (links.X !== "") {
    twitterBtn.classList.remove('hidden')
    $(twitterBtn).click(function() {
      window.invokeNative('openUrl', links.X)
    })  }
  if (links.TIKTOK !== "") {
    tiktokBtn.classList.remove('hidden')
    $(tiktokBtn).click(function() {
      window.invokeNative('openUrl', links.TIKTOK)
    })
  }
}


$(closeBtn).click(function() {
  $.post(`https://${GetParentResourceName()}/close`)
})

$(optionsBtn).click(function() {
  $.post(`https://${GetParentResourceName()}/options`)
})

$(mapBtn).click(function() {
  $.post(`https://${GetParentResourceName()}/map`)
})

const controlsPanel = document.getElementById('controls-panel')

$(controlsBtn).click(function() {
  controlsPanel.classList.toggle('hidden')
})

$(closeControlsBtn).click(function() {
  controlsPanel.classList.toggle('hidden')
})

$(quitBtn).click(function() {
  $.post(`https://${GetParentResourceName()}/quit`)
})


document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    $.post(`https://${GetParentResourceName()}/close`)
  }
});

$(document).ready(function() {
  $.post('https://pause_menu/loadsettings');
});