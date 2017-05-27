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
  var se = Application('System Events')
  var saf = Application('Safari')
  saf.activate()
  saf.includeStandardAdditions = true
  console.log(saf.name())
  console.log(saf.version())
  
  saf.close(saf.windows)
  saf.openLocation(argv[0])
  
  delay(3)
  
  var saf_process = se.applicationProcesses.byName("Safari")
  var uiElements = saf_process.windows[0].splitterGroups[0]

  wait_and_action(function() {return uiElements.entireContents()}, 
                         [is_type.bind(null, 'AXTextField'), has_value.bind(null, 'Password')],
                         fill_text.bind(null, false, argv[1]))
                         
  wait_and_action(function() {return uiElements.entireContents()}, 
                       [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Continue')],
                       click_action)
  
  wait_and_action(function() {return uiElements.entireContents()}, 
                      [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Done')],
                      click_action)
  
}