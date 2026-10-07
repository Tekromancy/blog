---
title: The Chain of Responsibility
description: Sequencing protective wards via function chaining.
type: gleam
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sequential Wards"
formula: |2
  pub type Request {
    Request(payload: String)
  }

  pub type Handler = fn(Request) -> Result(Request, String)

  pub fn check_auth(req: Request) -> Result(Request, String) {
    // Auth logic
    Ok(req)
  }

  pub fn check_mana(req: Request) -> Result(Request, String) {
    // Mana logic
    Ok(req)
  }

  pub fn handle_request(req: Request) -> Result(Request, String) {
    use req <- gleam/result.try(check_auth(req))
    use req <- gleam/result.try(check_mana(req))
    Ok(req)
  }
tags: [abjuration, chain-of-responsibility, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Chain of Responsibility
By combining `Result` types and `use` expressions, we chain handlers where a failure in any ward halts the entire sequence.
