#!/usr/bin/env osascript -l JavaScript

function run(argv) {
  var se = Application('System Events')
  var its = Application('iTunes')
  its.activate()
  its.includeStandardAdditions = true
  console.log(its.name())
  console.log(its.version())
  console.log(Path(argv[0]))
  
  var app = Application.currentApplication()
  app.includeStandardAdditions = true
  var json = JSON.parse(app.read(Path(argv[0])))
  
  var its_process = se.applicationProcesses.byName("iTunes")
  
  var uiElements = its_process.windows[0].splitterGroups[0].groups[0].groups[0].scrollAreas[0].uiElements[0]
  
  // var l = uiElements.entireContents()
  // for (i=0; i<l.length; i++) {
  //   console.log(l[i].role(), l[i].name(), l[i].description(), l[i].title())
  // } 
  
  its.openLocation('itms://itunes.apple.com/us/app/testflight/id899247664?mt=8 ')
  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_description.bind(null, 'Get')],
                  click_action)
                  
  wait_and_action(function() {return its_process.windows[0].entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Create')],
                  click_action)
  
  delay(0.3)                
  its_process.frontmost = true
  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Continue')],
                  click_action)
                                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXCheckBox')],
                  click_action)
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Agree')],
                  click_action)
              
   wait_and_action(function() {return uiElements.groups[2].entireContents()}, 
                   [is_type.bind(null, 'AXTextField')],
                   fill_text.bind(null, true, json['Email']))
   
   wait_and_action(function() {return uiElements.groups[3].groups[1].entireContents()}, 
                   [is_type.bind(null, 'AXTextField')],
                   fill_text.bind(null, true, json['Password']))
                   
   wait_and_action(function() {return uiElements.groups[3].groups[3].entireContents()}, 
                   [is_type.bind(null, 'AXTextField')],
                   fill_text.bind(null, true, json['Password']))
                   
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXPopUpButton'), has_description.bind(null, 'First')],
                   choose_pop_up.bind(null, its_process, json['Secret Question 1']))
                   
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXPopUpButton'), has_description.bind(null, 'Second')],
                   choose_pop_up.bind(null, its_process, json['Secret Question 2']))
                   
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXPopUpButton'), has_description.bind(null, 'Third')],
                   choose_pop_up.bind(null, its_process, json['Secret Question 3']))
                   
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'First')],
                   fill_text.bind(null, true, json['Secret Answer 1']))
                   
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Second')],
                   fill_text.bind(null, true, json['Secret Answer 2']))
                   
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Third')],
                   fill_text.bind(null, true, json['Secret Answer 3']))
                 
   wait_and_action(function() {return uiElements.entireContents()}, 
                   [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Year')],
                   fill_text.bind(null, true, json['Year Of Birth']))
  
  wait_and_action(function() {return uiElements.groups[15].entireContents()}, 
                  [is_type.bind(null, 'AXCheckBox')],
                  click_action)
  
  wait_and_action(function() {return uiElements.groups[16].entireContents()}, 
                  [is_type.bind(null, 'AXCheckBox')],
                  click_action)
  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXPopUpButton'), has_value.bind(null, 'Month')],
                  choose_pop_up.bind(null, its_process, json['Month Of Birth']))
  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXPopUpButton'), has_value.bind(null, 'Day')],
                  choose_pop_up.bind(null, its_process, json['Day Of Birth']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Continue')],
                  click_action)
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXPopUpButton'), has_value.bind(null, 'Title')],
                  choose_pop_up.bind(null, its_process, 1))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'First')],
                  fill_text.bind(null, true, json['First Name']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Last')],
                  fill_text.bind(null, true, json['Last Name']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Street')],
                  fill_text.bind(null, true, json['Address Street']))
                  
  /*wait_and_action(function() {return uiElements.groups[8].groups[1].entireContents()}, 
                  [is_type.bind(null, 'AXTextField')],
                  fill_text.bind(null, true, json['Address Apt']))*/
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'City')],
                  fill_text.bind(null, true, json['Address City']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Zip')],
                  fill_text.bind(null, true, json['Address Zip']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Area')],
                  fill_text.bind(null, false, json['Phone Area Code']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXTextField'), has_description.bind(null, 'Phone')],
                  fill_text.bind(null, true, json['Phone Number']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXPopUpButton'), has_value.bind(null, 'State')],
                  choose_pop_up.bind(null, its_process, json['Address State']))
                  
  wait_and_action(function() {return uiElements.entireContents()}, 
                  [is_type.bind(null, 'AXButton'), has_title.bind(null, 'Create')],
                  click_action)        
}

function find_item(haystack, conditions) {
  var items = haystack()
  
  for (j=0; j<items.length; j++) {
    var result = true
    for (i=0; i<conditions.length; i++) {
      result = result && conditions[i](items[j])
    }
    if (result == true) {
      return items[j]
    }
  }
  
  return undefined
}

function is_type(type, el) { 
  //console.log(type, el.role())
  var re = new RegExp(type, "gi")
  return el.role().search(re) != -1
}

function has_description(des, el) {
  console.log(des, el.description())
  var re = new RegExp(des, "gi")
  return el.description().search(re) != -1
}

function has_title(title, el) {
  console.log(title, el.title())
  var re = new RegExp(title, "gi")
  return el.title().search(re) != -1
}

function has_value(value, el) {
  console.log(value, el.value())
  var re = new RegExp(value, "gi")
  return el.value().search(re) != -1
}

function has_label(value, el) {
  console.log(value, el.label())
  var re = new RegExp(value, "gi")
  return el.label().search(re) != -1
}

function has_name(value, el) {
  console.log(value, el.name())
  var re = new RegExp(value, "gi")
  return el.name().search(re) != -1
}

function wait_for(func) {
  do {delay(1)}
  while (func() == false)
}

function click_action(el) {
  el.click()
}

function fill_text(simulate_keystrokes, value, el) {
  el.focused = true
  var se = Application('System Events')
  el.value = value.toString()
  if (simulate_keystrokes) {
    se.keyCode(49)
    se.keyCode(51)
  } 
  el.focused = false
}

function choose_pop_up(target_process, value, el) {
  el.focused = true
  var se = Application('System Events')
  se.keyCode(49)
  delay(1)
  
  var index = 0
  
  if (isNaN(parseInt(value))) {
    var menu = target_process.windows[0].splitterGroups[0].groups[0].menus[0].entireContents()
    for (i=0; i<menu.length; i++) {
      if (menu[i].title().search(value) != -1) {
        index = i
        break
      }
    }
  }
  else {
    index = parseInt(value)
  }
  
  for (i=0; i<index; i++) {
    se.keyCode(125)
    delay(0.1)
  }
  
  se.keyCode(49)
  el.focused = false
}

function wait_and_action(haystack, conditions, action) {
  wait_for(function() {
    try {
      console.log('Searching element')
      console.log('----------------')
      var item = find_item(haystack, conditions)
      
      if (item != undefined) {
        action(item)
        return true
      }
      else {
        return false
      }
    }
    catch (e) {
      console.log(e)
      return false
    }
  })
}