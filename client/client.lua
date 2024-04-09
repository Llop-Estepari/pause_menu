local focus = false

RegisterNUICallback('loadsettings', function()
  SendNUIMessage({
    type = 'SETTINGS',
    links = Config.Links,
    colors = Config.Colors,
    controls = Config.Controls,
    playerID = GetPlayerServerId(PlayerId()),
  })
end)

local function toggleMessage()
  focus = not focus
  SetNuiFocus(focus, focus)
  SendNUIMessage({
    type = 'TOGGLE',
    playerCount = #GetActivePlayers(),
  })
end

local function closePauseMenu()
  toggleMessage()
end

local function openPauseMenu()
  if GetPauseMenuState() ~= 0 then
    return
  end
  toggleMessage()
end

RegisterNUICallback('close', function()
  closePauseMenu()
end)

RegisterNUICallback('options', function()
  closePauseMenu()
  ActivateFrontendMenu(`FE_MENU_VERSION_LANDING_MENU`, false, -1)
end)

RegisterNUICallback('map', function()
  closePauseMenu()
  Wait(100)
  ActivateFrontendMenu(`FE_MENU_VERSION_MP_PAUSE`, false, -1)
  while not IsFrontendReadyForControl() do Wait(0) end
  PauseMenuceptionGoDeeper(1000)
end)

RegisterNUICallback('quit', function()
  closePauseMenu()
  QuitGame()
end)


RegisterCommand('-pause', function()
  if focus then
    closePauseMenu()
  else
    openPauseMenu()
  end
end, false)

RegisterKeyMapping('-pause', 'Open Pause Menu', 'keyboard', "ESCAPE")

CreateThread(function()
  while true do
    Wait(0)
    SetPauseMenuActive(false)
  end
end)
