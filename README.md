# ehoi Package ID Grabber

## Allgemeine Information

Dieses Repository hilft Package IDs und Trip IDs für bestimmte e-hoi Reisen simpler auszugeben. Es ist ein experimentelles Chrome Add-On und wurde für eine einzige Person geschrieben.

## Installation

### e-hoi Mitarbeiter

1. Geh zu den [Releases](https://github.com/Necitero/ehoi-package-id-grabber/releases) und lade dir die neueste `e-hoi-id-grabber.zip` Datei runter. Am besten speicherst du den Ordner an einem Ort, an dem du die Erweiterung nicht löschen wirst.
2. Extrahiere die .zip Datei. Im neuen `e-hoi-id-grabber` Ordner sollte nun eine index.html liegen. Falls nicht: Schau, dass nicht versehentlich ein `e-hoi-id-grabber` Ordner im `e-hoi-id-grabber` Ordner liegt.
3. Geh auf den [Chrome Extension Tab](chrome://extensions/).
4. Drück oben rechts auf `Developer Mode` bzw. `Entwickler Modus`.
5. Drück oben links auf `Load unpacked` bzw. `Entpackte Erweiterung Laden`.
6. Wähle den Ordner aus, der dir geschickt wurde.
7. Geh auf eine e-hoi Angebotsseite und drücke oben auf das Extension-Symbol (Puzzel-Stück).
8. Drück auf das e-hoi Icon.
9. (Optional): Pin das Add-On um es schnell griffbereit zu haben.

### Developer

Voraussetzung: Die neueste Version von Node

1. Klone dieses Repository.
2. Geh in den Ordner und installiere alle Module mit `npm i`.
3. Builde das Projekt mit `npm run build`.
4. Folge den Schritten aus `e-hoi Mitarbeiter` und benutze den `e-hoi-id-grabber/` Ordner.

## Lizens

This project is licensed under the terms of the MIT license.
