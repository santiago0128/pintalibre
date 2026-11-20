; Instalador de PintaLibre (NSIS)
Unicode true
SetCompressor /SOLID lzma
!include "MUI2.nsh"

!define APPNAME "PintaLibre"
!define APPVER "1.0.0"
!define UNINSTKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\PintaLibre"

Name "${APPNAME}"
OutFile "release\PintaLibre-Instalador-${APPVER}.exe"
InstallDir "$LOCALAPPDATA\Programs\PintaLibre"
InstallDirRegKey HKCU "Software\PintaLibre" "InstallDir"
RequestExecutionLevel user
BrandingText "PintaLibre ${APPVER}"

VIProductVersion "1.0.0.0"
VIAddVersionKey /LANG=1034 "ProductName" "PintaLibre"
VIAddVersionKey /LANG=1034 "FileDescription" "Instalador de PintaLibre"
VIAddVersionKey /LANG=1034 "FileVersion" "${APPVER}"
VIAddVersionKey /LANG=1034 "ProductVersion" "${APPVER}"
VIAddVersionKey /LANG=1034 "LegalCopyright" "PintaLibre"

!define MUI_ICON "build\icon.ico"
!define MUI_UNICON "build\icon.ico"
!define MUI_ABORTWARNING
!define MUI_WELCOMEPAGE_TITLE "Bienvenido a PintaLibre"
!define MUI_WELCOMEPAGE_TEXT "Este asistente instalará PintaLibre, tu app de dibujo, en este equipo.$\r$\n$\r$\nHaz clic en Siguiente para continuar."
!define MUI_FINISHPAGE_RUN "$INSTDIR\PintaLibre.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Abrir PintaLibre ahora"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "Spanish"

Section "PintaLibre" SecMain
  SetOutPath "$INSTDIR"
  ; borra archivos de una versión anterior (no toca tus dibujos guardados)
  RMDir /r "$INSTDIR\locales"
  RMDir /r "$INSTDIR\resources"
  File /r "dist\PintaLibre-win32-x64\*.*"
  WriteUninstaller "$INSTDIR\Desinstalar PintaLibre.exe"
  CreateShortCut "$DESKTOP\PintaLibre.lnk" "$INSTDIR\PintaLibre.exe" "" "$INSTDIR\PintaLibre.exe" 0
  CreateDirectory "$SMPROGRAMS\PintaLibre"
  CreateShortCut "$SMPROGRAMS\PintaLibre\PintaLibre.lnk" "$INSTDIR\PintaLibre.exe" "" "$INSTDIR\PintaLibre.exe" 0
  CreateShortCut "$SMPROGRAMS\PintaLibre\Desinstalar PintaLibre.lnk" "$INSTDIR\Desinstalar PintaLibre.exe"
  WriteRegStr HKCU "Software\PintaLibre" "InstallDir" "$INSTDIR"
  WriteRegStr HKCU "${UNINSTKEY}" "DisplayName" "PintaLibre"
  WriteRegStr HKCU "${UNINSTKEY}" "DisplayVersion" "${APPVER}"
  WriteRegStr HKCU "${UNINSTKEY}" "Publisher" "PintaLibre"
  WriteRegStr HKCU "${UNINSTKEY}" "DisplayIcon" "$INSTDIR\PintaLibre.exe"
  WriteRegStr HKCU "${UNINSTKEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "${UNINSTKEY}" "UninstallString" '"$INSTDIR\Desinstalar PintaLibre.exe"'
  WriteRegDWORD HKCU "${UNINSTKEY}" "NoModify" 1
  WriteRegDWORD HKCU "${UNINSTKEY}" "NoRepair" 1
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\PintaLibre.lnk"
  RMDir /r "$SMPROGRAMS\PintaLibre"
  RMDir /r "$INSTDIR"
  DeleteRegKey HKCU "${UNINSTKEY}"
  DeleteRegKey HKCU "Software\PintaLibre"
SectionEnd
