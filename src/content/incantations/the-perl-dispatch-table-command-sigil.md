---
title: "The Eldritch Sigil: Dispatch Table Command Pattern in Perl"
description: "Master the Gang of Four Command pattern in idiomatic modern Perl using first-class coderefs, dispatch tables, and lexical closures with undo/redo execution stacks."
type: "perl"
gofPattern: "Command Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Chaos Magic // The Eldritch Sigil Dispatch Table"
formula: |
  #!/usr/bin/env perl
  use strict; use warnings;

  my %COMMANDS = (
      ignite => sub { my ($target) = @_; print "[IGNITE] Flaming arrow struck $target\n"; },
      quench => sub { my ($target) = @_; print "[QUENCH] Frostward neutralized $target\n"; },
  );

  sub execute_command {
      my ($cmd, @args) = @_;
      die "Unknown command: $cmd\n" unless exists $COMMANDS{$cmd};
      $COMMANDS{$cmd}->(@args);
  }
  execute_command("ignite", "bastion-gate");
tags: ["perl", "perl5", "command-pattern", "dispatch-table", "coderefs", "closures", "gof-patterns", "chaos-magic"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Command Pattern

In 1994, the Gang of Four defined the **Command Pattern**:
> *"Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations."*
> — Design Patterns, p. 233

In traditional Java and C++, implementing the Command pattern requires heavy class hierarchies (`Command` interface, concrete command classes, receiver instances, invoker classes).

In Perl, functions are first-class citizens. A coderef (`sub { ... }`) combined with a **Dispatch Table** (a hash of anonymous subroutines) implements the Command pattern with supreme conciseness and zero boilerplate:
- Requests are encapsulated directly as coderefs.
- Arguments and contextual state are bound via lexical closures.
- Dynamic undo/redo stacks can be implemented with standard array operations (`push` and `pop`).

---

## The Complete Perl Script

Save this as `/usr/local/bin/eldritch_command.pl` and run with `perl`:

```perl
#!/usr/bin/env perl
# ==============================================================================
# SCRIPT: eldritch_command.pl
# PATTERN: Command Pattern (Gang of Four Behavioral)
# ARCANUM: Chaos Magic // The Eldritch Sigil Dispatch Table
# DESCRIPTION: Command encapsulation, dispatch tables, and reversible undo stacks.
# ==============================================================================
use strict;
use warnings;
use feature 'say';

# ------------------------------------------------------------------------------
# 1. RECEIVER / SYSTEM STATE
# ------------------------------------------------------------------------------
my %SYSTEM_STATE = (
    shields => 100,
    reactor => "OFFLINE",
    warp_gate => "CLOSED",
);

sub dump_state {
    say "[TELEMETRY STATE]";
    say "  Shields:   $SYSTEM_STATE{shields}%";
    say "  Reactor:   $SYSTEM_STATE{reactor}";
    say "  Warp Gate: $SYSTEM_STATE{warp_gate}";
    say "---------------------------------------------";
}

# ------------------------------------------------------------------------------
# 2. COMMAND FACTORY (CREATING EXECUTABLE & REVERSIBLE COMMAND OBJECTS)
# Each command returns a pair of coderefs: (execute_sub, undo_sub)
# ------------------------------------------------------------------------------
sub make_reactor_command {
    my ($target_state) = @_;
    my $prev_state;

    return {
        name    => "SET_REACTOR_$target_state",
        execute => sub {
            $prev_state = $SYSTEM_STATE{reactor};
            $SYSTEM_STATE{reactor} = $target_state;
            say ">> [COMMAND EXEC] Reactor shifted from $prev_state to $target_state";
        },
        undo    => sub {
            $SYSTEM_STATE{reactor} = $prev_state;
            say "<< [COMMAND UNDO] Reactor restored to $prev_state";
        },
    };
}

sub make_shield_boost_command {
    my ($amount) = @_;

    return {
        name    => "BOOST_SHIELDS_+$amount",
        execute => sub {
            $SYSTEM_STATE{shields} += $amount;
            say ">> [COMMAND EXEC] Shields boosted by +$amount (Now $SYSTEM_STATE{shields}%)";
        },
        undo    => sub {
            $SYSTEM_STATE{shields} -= $amount;
            say "<< [COMMAND UNDO] Shield boost reverted by -$amount (Now $SYSTEM_STATE{shields}%)";
        },
    };
}

# ------------------------------------------------------------------------------
# 3. THE INVOKER (TRANSACTION MANAGER & UNDO STACK)
# ------------------------------------------------------------------------------
package CommandInvoker {
    sub new {
        my ($class) = @_;
        return bless {
            history => [],
        }, $class;
    }

    sub invoke {
        my ($self, $command) = @_;
        $command->{execute}->();
        push @{ $self->{history} }, $command;
    }

    sub undo_last {
        my ($self) = @_;
        if (@{ $self->{history} } == 0) {
            say "!! [UNDO WARNING] History stack is empty. No commands to revert.";
            return;
        }
        my $command = pop @{ $self->{history} };
        $command->{undo}->();
    }
}

# ------------------------------------------------------------------------------
# 4. EXECUTION DEMONSTRATION
# ------------------------------------------------------------------------------
say "[CHAOS MAGIC] Initializing Eldritch Command Invoker...";
dump_state();

my $invoker = CommandInvoker->new();

# Execute commands
$invoker->invoke(make_reactor_command("ONLINE"));
$invoker->invoke(make_shield_boost_command(50));
$invoker->invoke(make_shield_boost_command(25));
dump_state();

# Revert actions using the Undo Stack
say "--- Commencing Reverse Temporal Rollback (Undo) ---";
$invoker->undo_last();
$invoker->undo_last();
dump_state();
```

---

## Command Dispatch Mechanics

```
   User / Macro Script
            │
            ▼
┌──────────────────────────────────────┐
│  CommandInvoker                      │
│                                      │
│  @history stack:                     │
│  [ Command 1: Reactor ON  ]          │
│  [ Command 2: Shield +50% ] ──pop()──▶ Executes undo() closure
└──────────────────────────────────────┘
            │
            ▼ executes
┌──────────────────────────────────────┐
│  Receiver: %SYSTEM_STATE             │
│  { reactor => 'ONLINE', shields => 150 }
└──────────────────────────────────────┘
```
