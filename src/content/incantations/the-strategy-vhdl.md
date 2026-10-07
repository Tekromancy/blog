---
title: Strategy
description: Selects a processing algorithm dynamically based on a control signal.
type: vhdl
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Silicon Golemancy // Algorithmic Switch
formula: |
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;
  
  entity strategy_mux is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end strategy_mux;
  
  architecture Physical of strategy_mux is
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

# The Strategy Pattern in VHDL

Selects a processing algorithm dynamically based on a control signal.
