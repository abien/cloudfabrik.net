---
title: "Copilot: Wiederverwendbare Prompts"
description: "Wie funktionieren die neuen Prompt files"
pubDate: 2025-05-13
category: "AI/ML"
tags: ["copilot"]
draft: false
---

# Copilot: Wiederverwendbare Prompts

Mit dem Release "April 2025" ([v 1.100](https://code.visualstudio.com/updates/v1_100)) bietet VS Code die Möglichkeit, Prompts abzuspeichern und wiederzuverwenden. Das ist besonders hilfreich, wenn bestimmte Prompts immer wieder gebraucht werden.

## Beispielprompt
```markdown
---
mode: 'agent'
tools: ['getCurrentMilestone', 'getReleaseFeatures', 'file_search', 'semantic_search', 'read_file', 'insert_edit_into_file', 'create_file', 'replace_string_in_file', 'fetch_webpage', 'vscode_search_extensions_internal']
---
Generate release notes for the features I worked in the current release and update them in the release notes file. Use [release notes writing instructions file](.github/instructions/release-notes-writing.instructions.md) as a guide.
```

## Ablage und Aufruf
So generierte Prompts werden global oder projektweit in `.github/prompts/meinprompts.prompt.md` gespeichert. Aufrufbar sind sie im Chat-Feld per `/`-Befehl oder über die Befehlspalette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>).

## Warum sich das lohnt
- **Persönliche Präferenzen:** Je häufiger Copilot unterstützt, desto wichtiger ist es, Prompts an die eigene Arbeitsweise und Umgebung anzupassen.
- **Team-Standardisierung:** Ein gemeinsames Prompt (z. B. für Release Notes) im Repository sorgt dafür, dass alle dieselbe Vorlage nutzen und die Ergebnisse konsistenter werden.