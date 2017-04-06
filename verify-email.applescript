tell application "System Events" to tell process "iTunes"
  set frontmost to true
  delay 1
  set allElements to entire contents of front window
  
  repeat with anElement in allElements
    try
      if class of anElement is button and title of anElement is "OK" then
         click contents of anElement
         exit repeat
      end if
    end try
  end repeat
end tell