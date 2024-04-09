fx_version 'cerulean'
game 'gta5'
lua54 'true'

author 'Llop'
description 'Customized pause menu'
version '1.0.2'


client_scripts {
  'client/client.lua'
}
shared_script 'config.lua'
ui_page 'nui/nui.html'
files {
  'nui/*',
}

escrow_ignore {
  'config.lua',
}