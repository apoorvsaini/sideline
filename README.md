<p align="center">
  <img src="https://ph-files.imgix.net/0745c2fb-5890-4c9d-9d0d-81901bedb284?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&fit=max&dpr=2" width="100" height="100" alt="Sideline '18"/>
</p>


# Sideline '18

## Multiplayer real-time football manager game for MacOS

The current app is still in beta so there might be some bugs, but do clone/fork it and try it out.

**How to run it?**

```
npm install 
npm start
```

**How to package it for MacOS?**

```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=resources/icon.icns --prune=true --out=release-builds
```
