---
title: The Command
description: Encapsulating an incantation as an object to be invoked later.
type: cpp
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  #include <memory>
  class SpellCommand {
  public: virtual ~SpellCommand() = default; virtual void Execute() = 0;
  };
  class Teleport : public SpellCommand {
  public: void Execute() override {}
  };
  class Wand {
      std::unique_ptr<SpellCommand> cmd;
  public:
      void Bind(std::unique_ptr<SpellCommand> c) { cmd = std::move(c); }
      void Wave() { if(cmd) cmd->Execute(); }
  };
tags: [behavioral, command, cpp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
