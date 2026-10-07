---
title: Mediator
description: Centralizes complex communications between multiple modules.
type: vhdl
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Silicon Golemancy // Bus Arbiter"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  entity mediator_hub is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end mediator_hub;

  architecture Physical of mediator_hub is
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
tags: [vhdl, behavioral, silicon-golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator Pattern in VHDL

Centralizes complex communications between multiple modules.
