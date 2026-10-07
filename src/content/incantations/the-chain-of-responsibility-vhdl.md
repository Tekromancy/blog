---
title: Chain of Responsibility
description: Passes a command down a pipeline of handlers.
type: vhdl
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Silicon Golemancy // Pipeline Cascade"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  entity chain_pipeline is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end chain_pipeline;

  architecture Physical of chain_pipeline is
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

# The Chain of Responsibility Pattern in VHDL

Passes a command down a pipeline of handlers.
