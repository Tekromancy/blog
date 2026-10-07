import os

patterns = [
    ("Abstract Factory", "Creational", "Conjuration // Matrix Weaving"),
    ("Builder", "Creational", "Conjuration // Artifact Forging"),
    ("Factory Method", "Creational", "Conjuration // Entity Summoning"),
    ("Prototype", "Creational", "Illusion // Mirror Replication"),
    ("Singleton", "Creational", "Enchantment // Monolith Binding"),

    ("Adapter", "Structural", "Transmutation // Protocol Shifting"),
    ("Bridge", "Structural", "Transmutation // Dimensional Bridging"),
    ("Composite", "Structural", "Illusion // Fractal Structuring"),
    ("Decorator", "Structural", "Enchantment // Aura Layering"),
    ("Facade", "Structural", "Illusion // Veil Masking"),
    ("Flyweight", "Structural", "Transmutation // Essence Pooling"),
    ("Proxy", "Structural", "Abjuration // Ward Interception"),

    ("Chain of Responsibility", "Behavioral", "Evocation // Cascade Routing"),
    ("Command", "Behavioral", "Enchantment // Geas Inscription"),
    ("Interpreter", "Behavioral", "Divination // Rune Deciphering"),
    ("Iterator", "Behavioral", "Divination // Leyline Traversal"),
    ("Mediator", "Behavioral", "Enchantment // Nexus Routing"),
    ("Memento", "Behavioral", "Chrononmancy // Time Anchoring"),
    ("Observer", "Behavioral", "Divination // Astral Watching"),
    ("State", "Behavioral", "Transmutation // Phase Shifting"),
    ("Strategy", "Behavioral", "Divination // Tactical Prevision"),
    ("Template Method", "Behavioral", "Evocation // Ritual Skeleton"),
    ("Visitor", "Behavioral", "Necromancy // Essence Extraction")
]

base_dir = "/home/thoth/tekromancy/blog/src/content/incantations"
os.makedirs(base_dir, exist_ok=True)

template = """---
title: "{pattern} via Serpent Speed Runes"
description: "Channeling the {pattern} pattern through the raw, compiled velocity of Nimrod's serpent syntax."
type: nim
gofPattern: {pattern}
gofCategory: {category}
arcaneSchool: {school}
formula: |
{formula}
tags: [nim, {tag_pattern}, {category_low}, serpent-runes, metaprogramming]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: {difficulty}
---
# The {pattern} Serpent Rune

In the neon-lit datashrubs of the cyberpunk sprawl, the **{pattern}** is wielded by archmages seeking python-like fluidity without sacrificing the unyielding speed of compiled metal. Through the Serpent Speed Runes of Nim, we invoke powerful metaprogramming spells to bend the AST to our will.

## Lore of the {pattern}
The {category} school teaches us to mold reality. By using Nim's macro spells and swift execution, the {pattern} manifests in the physical realm seamlessly. Compile to C, execute like lightning.
"""

codes = {
    "Abstract Factory": '''  type
    SpellFactory = ref object of RootObj
    FireFactory = ref object of SpellFactory
    IceFactory = ref object of SpellFactory
    Spell = ref object of RootObj
    FireSpell = ref object of Spell
    IceSpell = ref object of Spell

  method castSpell(s: Spell) {.base.} = discard
  method castSpell(s: FireSpell) = echo "Casting Fire!"
  method castSpell(s: IceSpell) = echo "Casting Ice!"

  method createSpell(f: SpellFactory): Spell {.base.} = discard
  method createSpell(f: FireFactory): Spell = FireSpell()
  method createSpell(f: IceFactory): Spell = IceSpell()''',

    "Builder": '''  type
    Golem = object
      head, body, arms, legs: string
    GolemBuilder = ref object
      g: Golem

  proc newGolemBuilder(): GolemBuilder = GolemBuilder(g: Golem())
  proc setHead(b: GolemBuilder, h: string) = b.g.head = h
  proc build(b: GolemBuilder): Golem = b.g''',

    "Factory Method": '''  type
    Familiar = ref object of RootObj
    Raven = ref object of Familiar
    Cat = ref object of Familiar

  method speak(f: Familiar) {.base.} = discard
  method speak(f: Raven) = echo "Nevermore"
  method speak(f: Cat) = echo "Meow"

  proc summonFamiliar(kind: string): Familiar =
    if kind == "raven": Raven()
    else: Cat()''',

    "Prototype": '''  type
    Cloneable = ref object of RootObj
    ShadowClone = ref object of Cloneable
      mana: int

  method clone(c: Cloneable): Cloneable {.base.} = discard
  method clone(c: ShadowClone): Cloneable =
    ShadowClone(mana: c.mana)''',

    "Singleton": '''  type
    LeylineGrid = ref object
      energy: int

  var instance: LeylineGrid

  proc getGrid(): LeylineGrid =
    if instance.isNil:
      instance = LeylineGrid(energy: 100)
    result = instance''',

    "Adapter": '''  type
    OldWand = ref object
    NewStaff = ref object

  proc flick(w: OldWand) = echo "Flick wand"
  proc channel(s: NewStaff) = echo "Channel staff"

  type StaffAdapter = ref object
    wand: OldWand

  proc channel(a: StaffAdapter) = a.wand.flick()''',

    "Bridge": '''  type
    Rune = ref object of RootObj
    FireRune = ref object of Rune
    Weapon = ref object of RootObj
      rune: Rune
    Sword = ref object of Weapon

  method ignite(r: Rune) {.base.} = discard
  method ignite(r: FireRune) = echo "Rune burns bright"

  proc attack(w: Sword) = w.rune.ignite()''',

    "Composite": '''  type
    Component = ref object of RootObj
    Leaf = ref object of Component
    CompositeNode = ref object of Component
      children: seq[Component]

  method operation(c: Component) {.base.} = discard
  method operation(l: Leaf) = echo "Leaf op"
  method operation(c: CompositeNode) =
    for child in c.children: child.operation()''',

    "Decorator": '''  type
    Artifact = ref object of RootObj
    BaseArtifact = ref object of Artifact
    ArtifactDecorator = ref object of Artifact
      wrapped: Artifact

  method use(a: Artifact) {.base.} = discard
  method use(b: BaseArtifact) = echo "Base use"
  method use(d: ArtifactDecorator) =
    d.wrapped.use()
    echo "Plus extra power"''',

    "Facade": '''  type
    SubsystemA = object
    SubsystemB = object
    MagicFacade = object
      a: SubsystemA
      b: SubsystemB

  proc initA(a: SubsystemA) = echo "Init A"
  proc initB(b: SubsystemB) = echo "Init B"

  proc castGrandSpell(f: MagicFacade) =
    f.a.initA()
    f.b.initB()''',

    "Flyweight": '''  import tables

  type
    ParticleType = ref object
      color: string
    ParticleSystem = object
      types: Table[string, ParticleType]

  proc getParticleType(ps: var ParticleSystem, color: string): ParticleType =
    if not ps.types.hasKey(color):
      ps.types[color] = ParticleType(color: color)
    result = ps.types[color]''',

    "Proxy": '''  type
    Grimoire = ref object of RootObj
    RealGrimoire = ref object of Grimoire
    ProxyGrimoire = ref object of Grimoire
      real: RealGrimoire
      accessLevel: int

  method read(g: Grimoire) {.base.} = discard
  method read(r: RealGrimoire) = echo "Reading ancient secrets"
  method read(p: ProxyGrimoire) =
    if p.accessLevel > 5:
      if p.real.isNil: p.real = RealGrimoire()
      p.real.read()
    else:
      echo "Access denied"''',

    "Chain of Responsibility": '''  type
    Handler = ref object of RootObj
      next: Handler

  method handle(h: Handler, req: string) {.base.} =
    if not h.next.isNil: h.next.handle(req)

  type MageHandler = ref object of Handler
  method handle(h: MageHandler, req: string) =
    if req == "magic": echo "Mage handled it"
    else: procCall Handler(h).handle(req)''',

    "Command": '''  type
    Command = ref object of RootObj
    CastCommand = ref object of Command
      spellName: string

  method execute(c: Command) {.base.} = discard
  method execute(c: CastCommand) = echo "Casting ", c.spellName''',

    "Interpreter": '''  import strutils

  type
    Expression = ref object of RootObj
    TerminalExpr = ref object of Expression
      data: string

  method interpret(e: Expression, context: string): bool {.base.} = discard
  method interpret(e: TerminalExpr, context: string): bool =
    return context.contains(e.data)''',

    "Iterator": '''  type
    Spellbook = object
      spells: seq[string]

  iterator items(sb: Spellbook): string =
    for s in sb.spells:
      yield s''',

    "Mediator": '''  type
    Mediator = ref object of RootObj
    Colleague = ref object of RootObj
      med: Mediator

  method notify(m: Mediator, sender: Colleague, event: string) {.base.} = discard''',

    "Memento": '''  type
    Memento = object
      state: string
    Originator = object
      state: string

  proc save(o: Originator): Memento = Memento(state: o.state)
  proc restore(o: var Originator, m: Memento) = o.state = m.state''',

    "Observer": '''  type
    Observer = ref object of RootObj
    Subject = ref object
      observers: seq[Observer]

  method update(o: Observer) {.base.} = discard
  proc attach(s: Subject, o: Observer) = s.observers.add(o)
  proc notify(s: Subject) =
    for o in s.observers: o.update()''',

    "State": '''  type
    State = ref object of RootObj
    Context = ref object
      state: State

  method request(s: State, c: Context) {.base.} = discard
  proc changeState(c: Context, s: State) = c.state = s''',

    "Strategy": '''  type
    Strategy = ref object of RootObj
    Context = ref object
      strat: Strategy

  method execute(s: Strategy) {.base.} = discard
  proc setStrategy(c: Context, s: Strategy) = c.strat = s''',

    "Template Method": '''  type
    Ritual = ref object of RootObj

  method step1(r: Ritual) {.base.} = discard
  method step2(r: Ritual) {.base.} = discard

  proc performRitual(r: Ritual) =
    r.step1()
    r.step2()''',

    "Visitor": '''  type
    Node = ref object of RootObj
    NodeA = ref object of Node
    Visitor = ref object of RootObj

  method visit(v: Visitor, n: NodeA) {.base.} = discard
  method accept(n: NodeA, v: Visitor) = v.visit(n)'''
}

difficulties = ["Apprentice", "Adept", "Archmage"]

for i, (pat, cat, school) in enumerate(patterns):
    kebab = pat.lower().replace(" ", "-")
    filename = f"the-{kebab}-nim.md"
    filepath = os.path.join(base_dir, filename)
    
    diff = difficulties[i % 3]
    formula_code = codes.get(pat, "  # Formula missing")
    
    content = template.format(
        pattern=pat,
        category=cat,
        school=school,
        tag_pattern=kebab,
        category_low=cat.lower(),
        difficulty=diff,
        formula=formula_code
    )
    
    with open(filepath, 'w') as f:
        f.write(content)
        
print("ALL_FILES_WRITTEN")
