Step 1: Create a file environments.plist inside the folder 
```bash
~/Library/LaunchAgents 
```
with the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>gui-environments</string>
  <key>ProgramArguments</key>
  <array>
    <string>sh</string>
    <string>-c</string>
    <string>
    /bin/launchctl setenv METAMASK_DEBUG true
  <!--  an example setting:
       /bin/launchctl setenv GOOGLE_DEFAULT_CLIENT_ID your_client_id  
    -->
    </string>
  </array>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

Regex:
```perl
'\([_]*[A-Z]\+\)\+'
```

app/scripts/controllers/plugins.js
26:const isTest = process.env.IN_TEST === 'true' || process.env.METAMASK_ENV === 'test'
fuzzylist
