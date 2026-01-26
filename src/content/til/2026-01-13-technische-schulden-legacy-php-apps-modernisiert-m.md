---
title: "Technische Schulden: Legacy PHP Apps modernisiert (mit KI-Support)"
description: "Erfahrungsbericht zur Modernisierung einer Legacy PHP-Applikation mit KI-Unterstützung"
pubDate: 2026-01-13
category: "Web"
tags: ["Erfahrungsbericht", "refactor", "techdebt"]
draft: false
---

# Technische Schulden: Legacy PHP Apps modernisiert (mit KI-Support)

Vor etwa sechs Wochen habe ich begonnen, eine Legacy-PHP-Applikation aus unserem internen Fundus mithilfe von KI zu modernisieren.

## Ausgangslage

Die Applikation ist über zehn Jahre alt und wurde damals für PHP 5 geschrieben. Sie wurde nicht mit einem heute üblichen Framework entwickelt, sondern mit einem eigenentwickelten Framework des damaligen Entwicklers umgesetzt. Nach der Inbetriebnahme erfolgte bis auf wenige Kleinigkeiten praktisch keine Pflege mehr.

Die Software hängt aus heutiger Sicht nicht nur funktionell unseren Wünschen hinterher, sondern wird auch operativ immer schwerer zu betreiben. Die veralteten PHP-Versionen aus der Fünfer-Serie sind schwer in modernen und performanten Hosting-Systemen bereitzustellen.

Es gab für damalige Verhältnisse einen aus meiner Sicht relativ modernen Ansatz für Development, Umgebung und Testing: Das Tool [Vagrant](https://developer.hashicorp.com/vagrant/intro) kam zum Einsatz. Leider hat sich dieses Tool innerhalb unseres firmeninternen Ökosystems nie durchgesetzt, sodass der Einsatz bei dieser PHP-App ungefähr der einzige geblieben ist. Somit gibt es leider kein Know-how mehr im Umgang mit [Vagrant](https://developer.hashicorp.com/vagrant/intro) bei uns.

Die Applikation hat bisher keine Unit-Tests, keine End-to-End-Tests oder andere Tests. Arbeitet man also in dieser Software, ist es nicht trivial festzustellen, ob die Funktionalität am Ende noch exakt gleich ist wie vorher. Manuelles Testing war angesagt.

## Wunschvorstellung

Die Applikation mit Unterstützung von Copilot in die Jetzt-Zeit bewegen. Dazu sollten folgende Punkte beachtet werden:

- Kompatibel mit PHP 8 und MariaDB 11.x
- Standardisierte und leicht zu bedienende Development-Umgebung – eigene lokale Umgebung pro Entwickler, keine „DEV-Server läuft da drüben"-Setups
- Standardisierter Deployment-Prozess mit CI/CD-Pipeline
- Nutzung moderner Tools zur Sicherstellung von Code-Qualität:
    - [PHPStan](https://github.com/phpstan/phpstan)
    - [PHP-CS-Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer)
- Möglichst umfangreiche End-to-End-Testing-Regeln mit [Playwright](https://github.com/microsoft/playwright)

## Erfahrungsbericht

### Schritt 1: Development-Umgebung aufsetzen

Zur Durchführung habe ich vorab in einer Art Unterhaltung mit dem KI-Agenten einen möglichst detaillierten Plan entwickelt: Was wollen wir erreichen? Was lassen wir bewusst außer Acht oder verschieben in eine spätere Phase? Diesen Plan habe ich als Markdown abgespeichert, damit ich bei Bedarf oder falls wir uns verrennen, jederzeit wieder an einer beliebigen Stelle einsteigen kann.

Als Erstes haben wir uns darauf konzentriert, die Testumgebung lokal neu aufzustellen. Wir nutzen dabei das Dev Container Setup von VS Code, das wiederum Docker-Container nutzt.

Wir haben einen LAMP-Stack erzeugt, der in etwa die Produktionsumgebung abbildet – z. B. die PHP-Version oder die Datenbankversion der alten Version unserer Software. Als dieses Setup funktionsfähig und halbwegs standardisiert war, mussten wir die Applikation aus der Produktion in die Testumgebung portieren. Dabei fiel als Erstes auf, dass der Code in der Produktion nicht mehr mit dem Code im Git-Repository übereinstimmt. Veraltet war natürlich das Git-Repository.

Die Migration des Codes aus der Produktionsumgebung in die Testumgebung erforderte eine Reihe von Anpassungen: Absolute Pfade vs. relative Pfade, wo ist die Konfiguration für die Applikation versteckt, welche Libraries werden benötigt usw. In relativ langen Einzelschritten mit starkem Debug-Charakter konnten wir das Ziel erreichen und hatten nun in unserer lokalen Testumgebung eine funktionsfähige Instanz unserer Legacy-PHP-Anwendung.

Als Nächstes haben wir uns um die Gestaltung von End-to-End-Tests gekümmert. Dies gestaltete sich verhältnismäßig zeitaufwendig und führte durchaus in einige Sackgassen, frei nach dem Motto: „Zwei Schritte vor, ein Schritt zurück." Letztendlich hatten wir dann die wichtigsten Funktionalitäten beschrieben, jeweils angelehnt an ein CRUD-Modell. Wo immer möglich, soll der Test etwas erzeugen, prüfen, ob es korrekt angelegt wurde, dann wieder löschen und prüfen, ob es korrekt gelöscht wurde.

Die Nutzung von [PHP-CS-Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) (und die damit verbundenen Anpassungen) haben wir relativ unbeaufsichtigt durch die KI nahezu autonom ausführen lassen. Gedacht war: Es handelt sich ja hier nur um Linting oder Formatierungen – was kann da schon kaputtgehen? Stellt sich heraus: In einem zehn Jahre alten Framework sind auch selbst entwickelte Template-Platzhalter (z. B. `%%MEINWERT-LALALA%%`) vorhanden. Wenn diese eine gewisse Zeilenlänge überschreiten, ist [PHP-CS-Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) der Meinung, dass ein Zeilenumbruch hier sinnvoll ist. Im Ergebnis haben wir uns damit selbst Fehler erzeugt, die optische Auswirkungen hatten – nichts, was unsere neuen End-to-End-Tests bemängelt hätten. Nachdem die Ursache einmal erkannt war, war die Behebung nicht kompliziert und schnell erledigt.

[PHPStan](https://github.com/phpstan/phpstan) haben wir dann auf ähnliche Weise, aber mit höherer Aufmerksamkeit genutzt. Auch hier hat die KI uns quasi federführend unterstützt: [PHPStan](https://github.com/phpstan/phpstan) meldet etwas Unzureichendes, die KI interpretiert und schlägt eine Änderung vor, wir bestätigen die Änderung – Fall erledigt. In unserer Code-Basis gab es hier sehr viel zu tun, und es dauerte sehr lange. Ließ sich aber, wie hier beschrieben, mit Schema F bearbeiten.

### Zwischenstand

Lokale Development-Umgebung funktioniert. Code ist (so) sauber (wie es eben geht). Tests gibt es auch. Gute Basis für alles Weitere.

### Schritt 2: Migration auf PHP 8

Nun haben wir den Agenten gebeten, die komplette App zu analysieren und PHP-8-fähig zu machen. Hier gab es so viele Änderungen im Code, dass wir nicht mehr jede Zeile auf Sinnhaftigkeit oder Plausibilität geprüft haben. Nach dem Motto „abgerechnet wird zum Schluss" haben wir ihn also arbeiten lassen. Der Agent war nach etwa einer Stunde Arbeit der Meinung, er sei fertig. Wirklich fertig war er allerdings erst viele Iterationen und Stunden später. Grundsätzlich kann man aber sagen: Es hat ausreichend gut funktioniert.

### Fazit

- Ohne die KI-Unterstützung hätten wir die App wahrscheinlich nicht angefasst.
- Nachdem wir den Code einmal sauber in die Neuzeit gehoben hatten, befassten wir uns mit der Anpassung auf Funktionsebene. Alte Zöpfe wurden abgeschnitten, neue Funktionen eingebaut.
- Die neuen Rahmenbedingungen (End-to-End-Tests, Deployment mit Rollout/Rollback, Development-Umgebung statt Edit in der Produktion) schaffen Sicherheit.
- Bugfixes machen auf einmal Spaß.

Wir haben das Projekt komplett mit Copilot gemacht. Hin und wieder waren auch Grenzen zu erkennen – der KI-Agent hat sich beim Debugging einige Male in die komplett falsche Richtung verrannt. Beim nächsten Mal würde ich noch etwas kleinteiliger vorgehen und zu Beginn mehr End-to-End-Tests aufsetzen. Die Planung, der Ablauf – das kann man sicher noch besser professionalisieren. 
