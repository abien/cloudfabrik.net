---
title: "Erste Probefahrt mit opencode"
description: "opencode ziemlich populär, Tendenz steigend. Ich probiere es aus."
pubDate: 2026-01-05
category: "AI/ML"
tags: ["opencode"]
draft: false
---

# Erste Probefahrt mit opencode

Nach ersten Erfahrungen mit VS Code und Copilot war ich neugierig, welche weiteren Möglichkeiten das AI-Developer-Ökosystem bietet. Schnell bin ich auf [opencode](https://github.com/anomalyco/opencode) gestoßen. Das Konzept einer CLI/TUI-Anwendung zur Verwaltung von Providern und Modellen sprach mich sofort an. Ich prüfe gerne auf GitHub, ob ein Projekt aktiv entwickelt wird und ein lebendiges Ökosystem hat – Indikatoren sind Plugins, Extensions oder Forks. Bei [opencode](https://github.com/anomalyco/opencode) ist das der Fall, was auf aktive Nutzung hindeutet.

Die Installation auf Windows erwies sich anfangs als knifflig. Alle Ansätze funktionieren technisch, aber jeder hatte Eigenheiten, die mich störten. Letztlich erwies sich die npm-Installation als sauberste Lösung:

```shell
npm i -g opencode-ai@latest
```

Der nächste Schritt war die Konfiguration des Providers. [opencode](https://github.com/anomalyco/opencode) unterstützt zahlreiche Provider. Zusätzlich bietet das Produkt [Zen](https://opencode.ai/docs/zen/) einen Gateway-Service mit getesteten und funktionierenden Modellen – im Grunde ein Reseller-Modell. Das klingt plausibel, daher habe ich mir ein paar Credits gekauft.

Erste Tests sind vielversprechend. Weitere Erkenntnisse folgen.

## Star History

<a href="https://www.star-history.com/#anomalyco/opencode&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=anomalyco/opencode&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=anomalyco/opencode&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=anomalyco/opencode&type=date&legend=top-left" />
 </picture>
</a>

