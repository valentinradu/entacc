cwd = function() {
    var app = Application.currentApplication()
    app.includeStandardAdditions = true
    return $(app.pathTo(this).toString()).stringByDeletingLastPathComponent.js
}

find_item = function(haystack, conditions) {
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

is_type = function(type, el) { 
  console.log(type, el.role())
  var re = new RegExp(type, "gi")
  return el.role().search(re) != -1
}

has_description = function(des, el) {
  //console.log(des, el.description())
  var re = new RegExp(des, "gi")
  return el.description().search(re) != -1
}

has_title = function(title, el) {
  console.log(title, el.title())
  var re = new RegExp(title, "gi")
  return el.title().search(re) != -1
}

has_value = function(value, el) {
  //console.log(value, el.value())
  var re = new RegExp(value, "gi")
  return el.value().search(re) != -1
}

has_label = function(value, el) {
  //console.log(value, el.label())
  var re = new RegExp(value, "gi")
  return el.label().search(re) != -1
}

has_name = function(value, el) {
  //console.log(value, el.name())
  var re = new RegExp(value, "gi")
  return el.name().search(re) != -1
}

wait_for = function(func, times) {
  do {
    delay(1)
    times -= 1
  }
  while (func() == false || times == 0)
}

click_action = function(el) {
  el.click()
}

fill_text = function(simulate_keystrokes, value, el) {
  el.focused = true
  var se = Application('System Events')
  el.value = value.toString()
  if (simulate_keystrokes) {
    se.keyCode(49)
    se.keyCode(51)
  } 
  el.focused = false
}

choose_pop_up = function(target_process, value, el) {
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

wait_and_action = function(haystack, conditions, action) {
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
      //console.log(e)
      return false
    }
  }, 9999999)
}