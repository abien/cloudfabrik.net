
---
title: "ProxLB: Load Balancing von CTs/VMs innerhalb des Clusters"
description: "Das Open-Source-Projekt ProxLB verspricht Load Balancing innerhalb von Proxmox. Ich probiere es aus."
pubDate: 2026-01-06
updatedDate: 2026-01-08
category: "Infra"
tags: ["proxmox", "opensource"]
draft: false
---

# ProxLB: Load Balancing von CTs/VMs innerhalb des Clusters

[ProxLB](https://github.com/credativ/ProxLB) ist ein fortschrittlicher Resource-Scheduler und Load Balancer, der speziell für Proxmox VE-Cluster entwickelt wurde.

## Update 2026-01-08

1234

Ich konnte problemlos ca 100 virtuelle Umgebung mit ProxLB migrieren. Die Verteilung ist wesentlich gleichmäßiger als vorher. Job well done.

## Welches Problem löst ProxLB?

Standardmäßig verteilt Proxmox virtuelle Maschinen (VMs) und Container (CTs) beim Starten zwar recht ordentlich, bietet aber kein dynamisches, automatisches Re-Balancing der Workloads im laufenden Betrieb.

Das Problem: Über die Zeit entstehen "Hotspots". Ein Node ist CPU-technisch am Limit, während ein anderer fast im Leerlauf läuft. Proxmox verschiebt diese Last nicht automatisch, es sei denn, ein Node fällt komplett aus (HA). [ProxLB](https://github.com/credativ/ProxLB) füllt diese Lücke, indem es den Cluster kontinuierlich überwacht und Lasten proaktiv verschiebt.

## Wie funktioniert es?

[ProxLB](https://github.com/credativ/ProxLB) ist ein externes Tool (geschrieben in Python), das über die Proxmox-API mit deinem Cluster kommuniziert. Es kann als Service, im Docker-Container oder direkt auf einem Node laufen.

### Kernfunktionen

- **Metriken-Analyse**: Prüft regelmäßig die Auslastung von CPU und RAM auf allen Nodes.

- **Tag-basiertes Management**: Die Steuerung erfolgt sehr elegant über Tags direkt in der Proxmox-GUI. Du musst keine komplexen Konfigurationsdateien für jede VM pflegen.

- **Affinity & Anti-Affinity**:
  - **Affinity (Zusammengehörigkeit)**: Über Tags wie `plb_affinity_app1` kannst du erzwingen, dass bestimmte VMs immer auf dem gleichen Host laufen (z. B. für geringe Latenz zwischen App- und DB-Server).
  - **Anti-Affinity (Trennung)**: Über Tags oder Pools sorgst du dafür, dass zwei Domain-Controller oder zwei Web-Nodes einer Gruppe niemals auf demselben Host landen, um die Ausfallsicherheit zu erhöhen.

- **Einschränkungen (Pinning/Ignore)**: Du kannst VMs an bestimmte Nodes "pinnen" (`plb_pin_nodename`) oder sie komplett vom Load Balancing ausschließen (`plb_ignore`), falls diese niemals verschoben werden dürfen.

## Wichtige Hinweise für den Betrieb

- **Live-Migration**: [ProxLB](https://github.com/credativ/ProxLB) nutzt die Standard-Proxmox-Migration. Das bedeutet, deine VMs sollten auf einem Shared Storage (wie Ceph, NFS oder ZFS-Replikation) liegen, damit die Verschiebung unterbrechungsfrei funktioniert.

- **HA-Konflikte**: Aktuell wird empfohlen, [ProxLB](https://github.com/credativ/ProxLB) vorsichtig einzusetzen, wenn gleichzeitig Proxmox HA-Gruppen genutzt werden, da sich die Logiken (wo eine VM "sein soll") überschneiden können.

## Fazit

[ProxLB](https://github.com/credativ/ProxLB) ist das "Gehirn", das Proxmox fehlt, um einen Cluster dauerhaft effizient und gleichmäßig auszulasten, ohne dass der Admin manuell VMs hin- und herschieben muss. Wie es der Zufall will, muss ich in den nächsten Tagen ein Cluster genau so ausbalancieren. Ideale Gelegenheit, ich werde berichten.
