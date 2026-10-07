---
title: Proxy
description: Controls access to a distant or sensitive component.
type: vhdl
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Silicon Golemancy // Guardian Node"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  entity proxy_controller is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end proxy_controller;

  architecture Physical of proxy_controller is
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

# The Proxy Pattern in VHDL

Controls access to a distant or sensitive component.
