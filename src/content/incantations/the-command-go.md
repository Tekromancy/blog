---
title: The Command
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
type: go
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Divination // Time-weaving
formula: |
  package command

  // Command interface
  type SpellCommand interface {
  	Execute()
  	Undo()
  }

  // Receiver
  type Golem struct {
  	Position int
  }
  func (g *Golem) MoveForward() { g.Position++ }
  func (g *Golem) MoveBackward() { g.Position-- }

  // Concrete Command
  type MoveCommand struct {
  	golem *Golem
  }
  func (m *MoveCommand) Execute() { m.golem.MoveForward() }
  func (m *MoveCommand) Undo() { m.golem.MoveBackward() }

  // Invoker
  type SpellQueue struct {
  	commands []SpellCommand
  }
  func (q *SpellQueue) Cast(cmd SpellCommand) {
  	cmd.Execute()
  	q.commands = append(q.commands, cmd)
  }
  func (q *SpellQueue) ChronoShift() {
  	if len(q.commands) == 0 { return }
  	last := q.commands[len(q.commands)-1]
  	last.Undo()
  	q.commands = q.commands[:len(q.commands)-1]
  }
tags: [Behavioral, Divination, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command
To master chronomancy is to view actions not as fleeting moments, but as tangible objects. The Command pattern crystallizes a spell into a concrete structure. These spell packets can be stored in a queue, delayed for trap triggering, or—most crucially—reversed in a temporal shift to undo fatal errors on the battlefield.
