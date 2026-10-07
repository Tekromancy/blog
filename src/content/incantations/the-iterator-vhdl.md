---
title: Iterator
description: Sequentially accesses elements of an array or memory block.
type: vhdl
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Silicon Golemancy // Memory Stepper
formula: |
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;
  
  entity iterator_stepper is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end iterator_stepper;
  
  architecture Physical of iterator_stepper is
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

# The Iterator Pattern in VHDL

Sequentially accesses elements of an array or memory block.
