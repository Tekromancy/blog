---
title: Memento
description: Captures and restores the internal state of a component.
type: vhdl
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Silicon Golemancy // State Snapshot"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  entity memento_shadow_reg is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end memento_shadow_reg;

  architecture Physical of memento_shadow_reg is
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

# The Memento Pattern in VHDL

Captures and restores the internal state of a component.
