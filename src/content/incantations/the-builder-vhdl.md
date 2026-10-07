---
title: Builder
description: Constructs complex configuration records step-by-step.
type: vhdl
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Silicon Golemancy // Signal Weaver"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  entity builder_fsm is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end builder_fsm;

  architecture Physical of builder_fsm is
  begin
      process(clk, rst)
      begin
          if rst = '1' then
              aether_out <= (others => '0');
          elsif rising_edge(clk) then
              aether_out <= not aether_in; 
          end if;
      end process;
  end Physical;
tags: [vhdl, creational, silicon-golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Builder Pattern in VHDL

Constructs complex configuration records step-by-step.

In the art of **Silicon Golemancy**, we manifest logic directly into the physical substrate.
