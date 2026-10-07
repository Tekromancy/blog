---
title: Bridge
description: Separates interface definitions from their implementations.
type: vhdl
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Silicon Golemancy // Decoupled Conduit
formula: |
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;
  
  entity bridge_interface is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end bridge_interface;
  
  architecture Physical of bridge_interface is
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
tags: [vhdl, structural, silicon-golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge Pattern in VHDL

Separates interface definitions from their implementations.
