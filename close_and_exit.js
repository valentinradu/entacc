#!/usr/bin/env osascript -l JavaScript

var require = function (path) {
  if (typeof app === 'undefined') {
    app = Application.currentApplication()
    app.includeStandardAdditions = true
  }

  var handle = app.openForAccess(Path(path))
  var contents = app.read(handle)
  app.closeAccess(Path(path))

  var module = {exports: {}}
  var exports = module.exports
  eval(contents)

  return module.exports
}

var utils = require('./utils.js')

function run(argv) {
  var its = Application('iTunes')
  its.activate()
  its.includeStandardAdditions = true
  console.log(its.name())
  console.log(its.version())
  
  var se = Application('System Events')
  var its_process = se.applicationProcesses.byName("iTunes")
  var uiElements = its_process.windows[0].splitterGroups[0].groups[0].groups[0].scrollAreas[0].uiElements[0]
  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_title.bind(null, 'OK')],
                  click_action)
  
  delay(1)
  var menu = its_process.menuBars[0].menus.byName("Account")
  menu.click()
  menu.menuItems[5].click()
}