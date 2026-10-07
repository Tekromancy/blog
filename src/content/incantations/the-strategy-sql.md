---
title: The Strategy of the Algorithmic Views
description: Swapping out the underlying computation behavior transparently via interchangeable views.
type: sql
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Conjuration // Path Shifting
formula: |
  CREATE TABLE trade_transactions (
      trade_id SERIAL PRIMARY KEY,
      base_amount NUMERIC
  );

  -- Strategy A: The Imperial Tax Calculation
  CREATE OR REPLACE VIEW tax_strategy_imperial AS
  SELECT trade_id, base_amount, (base_amount * 0.25) AS tax_owed
  FROM trade_transactions;

  -- Strategy B: The Rebel Guild Tax Calculation
  CREATE OR REPLACE VIEW tax_strategy_rebel AS
  SELECT trade_id, base_amount, (base_amount * 0.05) AS tax_owed
  FROM trade_transactions;

  -- The application decides which View (Strategy) to query
  -- SELECT * FROM tax_strategy_rebel;
tags: [views, strategy, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Strategy of the Algorithmic Views

When the logic dictating a calculation changes wildly depending on the context—such as different factions applying different tax rates to a trade—hardcoding monolithic `CASE` statements becomes untenable.

The Strategy pattern utilizes interchangeable **Views**. The application determines the context, and simply shifts its query target to the appropriate view. The underlying table structure remains ignorant of the strategy, while the view encapsulates the specific calculation algorithm cleanly.
