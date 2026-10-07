---
title: The Proxy
description: Controlling access to powerful relics via actor intermediaries.
type: gleam
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Warding"
formula: |2
  import gleam/erlang/process.{type Subject}

  pub type VaultMsg {
    Unlock(passphrase: String, reply_to: Subject(Result(String, String)))
  }

  pub fn access_vault(vault: Subject(VaultMsg), pass: String) -> Result(String, String) {
    process.call(vault, fn(reply_to) { Unlock(pass, reply_to) }, 1000)
  }
tags: [transmutation, proxy, gleam, otp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy
Actor boundaries serve as excellent proxies, controlling access to resources through message passing.
