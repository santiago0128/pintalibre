"""Genera PintaLibre.lnk: un acceso directo que abre PintaLibre como app con Microsoft Edge.

Útil en PCs con el Control inteligente de aplicaciones de Windows 11 activado, que bloquea
ejecutables sin firma. Edge está firmado por Microsoft, así que el acceso directo no se bloquea.

Uso:  pip install pylnk3
      python generar_acceso_directo.py "C:\\Users\\TU_USUARIO\\PintaLibre"
La carpeta indicada debe contener PintaLibre.html (copia de web/index.html) e icon.ico.
"""
import sys
import pylnk3

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    folder = sys.argv[1].rstrip("\\/")
    url = "file:///" + folder.replace("\\", "/") + "/PintaLibre.html"
    pylnk3.for_file(
        EDGE, "PintaLibre.lnk",
        arguments=f'--app="{url}" --start-maximized',
        description="PintaLibre - app de dibujo",
        icon_file=folder + r"\icon.ico", icon_index=0, work_dir=folder,
    )
    print("Creado PintaLibre.lnk ->", url)

if __name__ == "__main__":
    main()
