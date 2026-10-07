---
title: Template Method
description: Defines the skeleton of an algorithm, deferring steps to subcomponents.
type: vhdl
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Silicon Golemancy // Process Blueprint
formula: |
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;
  
  entity template_skeleton is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end template_skeleton;
  
  architecture Physical of template_skeleton is
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

# The Template Method Pattern in VHDL

Defines the skeleton of an algorithm, deferring steps to subcomponents.
