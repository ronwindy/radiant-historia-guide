export type TagType =
  | 'item'
  | 'equip'
  | 'weapon'
  | 'armor'
  | 'acc'
  | 'key'
  | 'place'
  | 'location'
  | 'gold'
  | 'skill'
  | 'ability'
  | 'char'
  | 'npc'
  | 'enemy'
  | 'boss';

export interface TextToken {
  type: 'text';
  text: string;
}

export interface TagToken {
  type: 'tag';
  tagType: TagType;
  text: string;
}

export interface NodeLinkToken {
  type: 'node-link';
  nodeNum: string;
  text: string;
}

export type RequirementToken = TextToken | TagToken | NodeLinkToken;

interface EntityRule {
  pattern: RegExp;
  tagType?: TagType;
  isNodeLink?: boolean;
}

const RULES: EntityRule[] = [
  // Node cross-references e.g. "(see 036)" or "see 036"
  { pattern: /\bsee\s+(\d{3})\b/i, isNodeLink: true },

  // Gold amounts
  { pattern: /\b\d+\s*G\b/, tagType: 'gold' },

  // Key Items / Scrolls / Books / Pacts
  { pattern: /\b(?:BROKEN LIMB|Broken Limb)\b/, tagType: 'key' },
  { pattern: /\b(?:FORCE CORE|Force Core)\b/, tagType: 'key' },
  { pattern: /\b(?:HASTE CORE|Haste Core)\b/, tagType: 'key' },
  { pattern: /\b(?:BLAST CORE|Blast Core)\b/, tagType: 'key' },
  { pattern: /\b(?:IMPALE CORE|Impale Core)\b/, tagType: 'key' },
  { pattern: /\b(?:CORE PARTS|Core Parts)\b/, tagType: 'key' },
  { pattern: /\b(?:SAVORY BOAR MEAT|Savory Boar Meat)\b/, tagType: 'key' },
  { pattern: /\b(?:SAVORY VEGGIES|Savory Veggies)\b/, tagType: 'key' },
  { pattern: /\b(?:RIGHT-CUT SCROLL|Right-Cut Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:LEFT-CUT SCROLL|Left-Cut Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:SLEEP GAS SCROLL|Sleep Gas Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:ROLL-CUT SCROLL|Roll-Cut Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:PIERCING SCROLL|Piercing Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:SLUMBERING SCROLL|Slumbering Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:POISONER'S SCROLL|Poisoner's Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:DARKSHIELD SCROLL|Darkshield Scroll)\b/, tagType: 'key' },
  { pattern: /\b(?:WIND GOD BOOK|Wind God Book)\b/, tagType: 'key' },
  { pattern: /\b(?:STRONGMAN BOOK|Strongman Book)\b/, tagType: 'key' },
  { pattern: /\b(?:OMNIPEDIA BOOK|Omnipedia Book)\b/, tagType: 'key' },
  { pattern: /\b(?:TRISTRIKE BOOK|Tristrike Book)\b/, tagType: 'key' },
  { pattern: /\b(?:FIRELIGHT PACT|Firelight Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:FIRESTAR PACT|Firestar Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:METEORITE PACT|Meteorite Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:THUNDERSTAR PACT|Thunderstar Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:ICESTAR PACT|Icestar Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:PROTECTION PACT|Protection Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:SUNLIGHT PACT|Sunlight Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:DIVINE PACT|Divine Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:FIRE PACT|Fire Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:DEATH PACT|Death Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:SHADE PACT|Shade Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:SOUL PACT|Soul Pact)\b/, tagType: 'key' },
  { pattern: /\b(?:BEAST GOD'S NAIL|Beast God's Nail)\b/, tagType: 'key' },
  { pattern: /\b(?:BEAST MARK|Beast Mark)\b/, tagType: 'key' },
  { pattern: /\b(?:BLACK PAGE|Black Page)\b/, tagType: 'key' },
  { pattern: /\b(?:SAND SWORD|Sand Sword)\b/, tagType: 'key' },
  { pattern: /\b(?:CELESTIAN FLOWER BUD|Celestian Flower Bud|Flower Bud)\b/, tagType: 'key' },
  { pattern: /\b(?:BLOODIED ARMLET|Bloodied Armlet)\b/, tagType: 'key' },

  // Weapons
  { pattern: /\b(?:ALISTEL EDGE|Alistel Edge)\b/, tagType: 'weapon' },
  { pattern: /\b(?:TRUE HISTORICA|True Historica)\b/, tagType: 'weapon' },
  { pattern: /\b(?:HISTORICA|Historica)\b/, tagType: 'weapon' },
  { pattern: /\b(?:PROMISED KNIFE|Promised Knife)\b/, tagType: 'weapon' },
  { pattern: /\b(?:PANDUR|Pandur)\b/, tagType: 'weapon' },
  { pattern: /\b(?:SUNA-WATARI|Suna-Watari)\b/, tagType: 'weapon' },
  { pattern: /\b(?:FREIKUGEL MERCY|Freikugel Mercy)\b/, tagType: 'weapon' },
  { pattern: /\b(?:FREIKUGEL ZAMIEL|Freikugel Zamiel)\b/, tagType: 'weapon' },
  { pattern: /\b(?:GLAUX DAGGER|Glaux Dagger)\b/, tagType: 'weapon' },
  { pattern: /\b(?:BEAST CLAW|Beast Claw)\b/, tagType: 'weapon' },
  { pattern: /\b(?:PIETI EDGE|Pieti Edge)\b/, tagType: 'weapon' },
  { pattern: /\b(?:GAIA BLADE|Gaia Blade)\b/, tagType: 'weapon' },
  { pattern: /\b(?:DEATH PIKE|Death Pike)\b/, tagType: 'weapon' },
  { pattern: /\b(?:MYTHRIL EDGE|Mythril Edge)\b/, tagType: 'weapon' },
  { pattern: /\b(?:DER LOWE|Der Lowe)\b/, tagType: 'weapon' },
  { pattern: /\b(?:OLD MAGIC BLADE|Old Magic Blade)\b/, tagType: 'weapon' },
  { pattern: /\b(?:CUSTOM SWORD|Custom Sword)\b/, tagType: 'weapon' },
  { pattern: /\b(?:BRONZE SWORD|Bronze Sword)\b/, tagType: 'weapon' },
  { pattern: /\b(?:LA TORMENTA|La Tormenta)\b/, tagType: 'weapon' },

  // Armor
  { pattern: /\b(?:BEAST SKINS|Beast Skins)\b/, tagType: 'armor' },
  { pattern: /\b(?:BRIGANDINE|Brigandine)\b/, tagType: 'armor' },
  { pattern: /\b(?:DIAMOND MAIL|Diamond Mail)\b/, tagType: 'armor' },
  { pattern: /\b(?:GOSPEL ARMOR|Gospel Armor)\b/, tagType: 'armor' },
  { pattern: /\b(?:GIANT CAPE|Giant Cape)\b/, tagType: 'armor' },
  { pattern: /\b(?:MIGHTY PROTECTOR|Mighty Protector)\b/, tagType: 'armor' },
  { pattern: /\b(?:MOIRAE MANTEAU|Moirae Manteau)\b/, tagType: 'armor' },
  { pattern: /\b(?:MYTHRIL MAIL|Mythril Mail)\b/, tagType: 'armor' },
  { pattern: /\b(?:MANA CAPE|Mana Cape)\b/, tagType: 'armor' },
  { pattern: /\b(?:NIRVANA PLATE|Nirvana Plate)\b/, tagType: 'armor' },
  { pattern: /\b(?:SKULL DRESS|Skull Dress)\b/, tagType: 'armor' },

  // Accessories
  { pattern: /\b(?:RABBIT'S FOOT|Rabbit's Foot)\b/, tagType: 'acc' },
  { pattern: /\b(?:THAUMATECH ORB|Thaumatech Orb)\b/, tagType: 'acc' },
  { pattern: /\b(?:THAUMA CHARM|Thauma Charms|Thauma Charm x3)\b/, tagType: 'acc' },
  { pattern: /\b(?:QUEEN STUD|Queen Stud x3)\b/, tagType: 'acc' },
  { pattern: /\b(?:BEAST CHARM|Beast Charms|Beast Charm x3)\b/, tagType: 'acc' },
  { pattern: /\b(?:KING STUD|King Stud)\b/, tagType: 'acc' },
  { pattern: /\b(?:WING ARMLET|Wing Armlet)\b/, tagType: 'acc' },
  { pattern: /\b(?:VENUS RING|Venus Ring)\b/, tagType: 'acc' },
  { pattern: /\b(?:SEED RING|Seed Ring)\b/, tagType: 'acc' },

  // Items
  { pattern: /\b(?:ANTI-SLEEPS|Anti-Sleeps|Anti-Sleep)\b/, tagType: 'item' },
  { pattern: /\b(?:ANTI-POISONS|Anti-Poisons|Anti-Poison)\b/, tagType: 'item' },
  { pattern: /\b(?:ANTI-PARALYTICS|Anti-Paralytics)\b/, tagType: 'item' },
  { pattern: /\b(?:MEDIBRANCH|Medibranch)\b/, tagType: 'item' },
  { pattern: /\b(?:SUPERIOR TEA|Superior Teas|Superior Tea)\b/, tagType: 'item' },
  { pattern: /\b(?:HERBAL TEA|Herbal Teas|Herbal Tea)\b/, tagType: 'item' },
  { pattern: /\b(?:HOLY WATER|Holy Waters|Holy Water)\b/, tagType: 'item' },
  { pattern: /\b(?:SOOTHING BALM|Soothing Balms|Soothing Balm)\b/, tagType: 'item' },
  { pattern: /\b(?:FIRST AID KIT|First Aid Kits|First Aid Kit)\b/, tagType: 'item' },
  { pattern: /\b(?:CELESTIAL DEW|Celestial Dew)\b/, tagType: 'item' },
  { pattern: /\b(?:TOURNIQUET|Tourniquets|Tourniquet)\b/, tagType: 'item' },
  { pattern: /\b(?:DIVINE WATER|Divine Water)\b/, tagType: 'item' },
  { pattern: /\b(?:PANACEA PLUS|Panacea Plus)\b/, tagType: 'item' },
  { pattern: /\b(?:SHIELD SEED PLUS|Shield Seed Plus)\b/, tagType: 'item' },
  { pattern: /\b(?:MAGIC HERB|Magic Herbs|Magic Herb)\b/, tagType: 'item' },
  { pattern: /\b(?:MANA CRYSTAL|Mana Crystals|Mana Crystal)\b/, tagType: 'item' },
  { pattern: /\b(?:SLEEP WING|Sleep Wings|Sleep Wing)\b/, tagType: 'item' },
  { pattern: /\b(?:POISON WING|Poison Wings|Poison Wing)\b/, tagType: 'item' },
  { pattern: /\b(?:ROYAL JELLY|Royal Jellies)\b/, tagType: 'item' },
  { pattern: /\b(?:HEALING FRUIT|Healing Fruit)\b/, tagType: 'item' },
  { pattern: /\b(?:HEALING HERB|Healing Herb)\b/, tagType: 'item' },

  // Locations
  { pattern: /\b(?:Royal City Granorg|Granorg Palace|Granorg)\b/, tagType: 'place' },
  { pattern: /\b(?:Alistel)\b/, tagType: 'place' },
  { pattern: /\b(?:Celestia)\b/, tagType: 'place' },
  { pattern: /\b(?:Cygnus HQ|Cygnus)\b/, tagType: 'place' },
  { pattern: /\b(?:Forgia)\b/, tagType: 'place' },
  { pattern: /\b(?:Skalla)\b/, tagType: 'place' },
  { pattern: /\b(?:Cornet Village|Cornet)\b/, tagType: 'place' },
  { pattern: /\b(?:Lazvil Hills)\b/, tagType: 'place' },
  { pattern: /\b(?:Alma Mine)\b/, tagType: 'place' },
  { pattern: /\b(?:Sand Fortress North|Sand Fortress South|Sand Fortress)\b/, tagType: 'place' },
  { pattern: /\b(?:Judgement Cliff|Judgment Cliff)\b/, tagType: 'place' },
  { pattern: /\b(?:Gran Plain East|Gran Plain)\b/, tagType: 'place' },
  { pattern: /\b(?:Imperial Ruins)\b/, tagType: 'place' },
  { pattern: /\b(?:Abyssia Forest|Abyss)\b/, tagType: 'place' },
  { pattern: /\b(?:Itolia Wasteland)\b/, tagType: 'place' },
  { pattern: /\b(?:Holff Ruins)\b/, tagType: 'place' },
  { pattern: /\b(?:Underground Lab|Underground Library|Underground Passage|Underground Waterway)\b/, tagType: 'place' },
  { pattern: /\b(?:Castle Sewers)\b/, tagType: 'place' },
  { pattern: /\b(?:First Ward|Second Ward|Commercial District|Downtown|Back Alley)\b/, tagType: 'place' },
  { pattern: /\b(?:Woodland Path East|Woodland Path|Highway East|Highway West|Highway)\b/, tagType: 'place' },
  { pattern: /\b(?:Royal Hall|Central Plaza|Palace-Front Plaza|Starlit Spring|Old Spring East)\b/, tagType: 'place' },
  { pattern: /\b(?:Equipment Shop|Weapon Shop|Item Shop|Tavern|Infirmary|Laboratory)\b/, tagType: 'place' },

  // Characters / Allies / Key NPCs
  { pattern: /\b(?:Stocke)\b/, tagType: 'char' },
  { pattern: /\b(?:Raynie)\b/, tagType: 'char' },
  { pattern: /\b(?:Marco)\b/, tagType: 'char' },
  { pattern: /\b(?:Rosch)\b/, tagType: 'char' },
  { pattern: /\b(?:Aht)\b/, tagType: 'char' },
  { pattern: /\b(?:Gafka)\b/, tagType: 'char' },
  { pattern: /\b(?:Eruca)\b/, tagType: 'char' },
  { pattern: /\b(?:Heiss)\b/, tagType: 'char' },
  { pattern: /\b(?:Sonja)\b/, tagType: 'char' },
  { pattern: /\b(?:Fennel)\b/, tagType: 'char' },
  { pattern: /\b(?:Elm)\b/, tagType: 'char' },
  { pattern: /\b(?:Bergas)\b/, tagType: 'char' },
  { pattern: /\b(?:Viola)\b/, tagType: 'char' },
  { pattern: /\b(?:Dias)\b/, tagType: 'char' },
  { pattern: /\b(?:Selvan)\b/, tagType: 'char' },
  { pattern: /\b(?:Garland)\b/, tagType: 'char' },
  { pattern: /\b(?:Kiel)\b/, tagType: 'char' },
  { pattern: /\b(?:Barranca)\b/, tagType: 'char' },
  { pattern: /\b(?:Vanoss)\b/, tagType: 'char' },
  { pattern: /\b(?:Liese)\b/, tagType: 'char' },
  { pattern: /\b(?:Raul)\b/, tagType: 'char' },
  { pattern: /\b(?:Bram)\b/, tagType: 'char' },
  { pattern: /\b(?:Hertz)\b/, tagType: 'char' },
  { pattern: /\b(?:Sword)\b/, tagType: 'char' },
  { pattern: /\b(?:Wand)\b/, tagType: 'char' },
  { pattern: /\b(?:Pentacle)\b/, tagType: 'char' },
  { pattern: /\b(?:Chalice)\b/, tagType: 'char' },
  { pattern: /\b(?:Anna)\b/, tagType: 'char' },
  { pattern: /\b(?:Hilster)\b/, tagType: 'char' },
  { pattern: /\b(?:Cedric)\b/, tagType: 'char' },
  { pattern: /\b(?:Meese)\b/, tagType: 'char' },
  { pattern: /\b(?:Mimel)\b/, tagType: 'char' },
  { pattern: /\b(?:Ricky)\b/, tagType: 'char' },
  { pattern: /\b(?:Tarquin)\b/, tagType: 'char' },
  { pattern: /\b(?:Teo)\b/, tagType: 'char' },
  { pattern: /\b(?:Lippti)\b/, tagType: 'char' },
  { pattern: /\b(?:Protea)\b/, tagType: 'char' },
  { pattern: /\b(?:Vainqueur)\b/, tagType: 'char' },
  { pattern: /\b(?:Gadeff)\b/, tagType: 'char' },
  { pattern: /\b(?:Berman)\b/, tagType: 'char' },
  { pattern: /\b(?:Claire)\b/, tagType: 'char' },
  { pattern: /\b(?:Will)\b/, tagType: 'char' },
  { pattern: /\b(?:Hugo)\b/, tagType: 'char' },
  { pattern: /\b(?:Palomides)\b/, tagType: 'char' },
  { pattern: /\b(?:Paelzan)\b/, tagType: 'char' },
  { pattern: /\b(?:Pierre)\b/, tagType: 'char' },

  // Skills / Abilities
  { pattern: /\b(?:Push Assault|Left Assault|Right Assault|Air Assault|Giant Push|Grapple)\b/, tagType: 'skill' },
  { pattern: /\b(?:Volt Star Trap|Fire Star Trap|Ice Trap|Ice Traps|Star Trap|Star Traps|Cross Star|Will o' Wisp|Wind God Strike|Musou)\b/, tagType: 'skill' },
  { pattern: /\b(?:Bomber skill|Bomber Skill|Mana Sight|sword-dancing|Strike ability|Strike)\b/, tagType: 'skill' }
];

export function parseNodeRequirement(requirement: string): RequirementToken[] {
  if (!requirement) return [];

  // Match items iteratively
  let tokens: RequirementToken[] = [{ type: 'text', text: requirement }];

  for (const rule of RULES) {
    const nextTokens: RequirementToken[] = [];

    for (const token of tokens) {
      if (token.type !== 'text') {
        nextTokens.push(token);
        continue;
      }

      const text = token.text;
      let lastIndex = 0;
      const globalRegex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
      let match: RegExpExecArray | null;

      while ((match = globalRegex.exec(text)) !== null) {
        const matchStart = match.index;
        const matchEnd = globalRegex.lastIndex;

        if (matchStart > lastIndex) {
          nextTokens.push({ type: 'text', text: text.slice(lastIndex, matchStart) });
        }

        if (rule.isNodeLink && match[1]) {
          nextTokens.push({
            type: 'node-link',
            nodeNum: match[1],
            text: match[0]
          });
        } else if (rule.tagType) {
          nextTokens.push({
            type: 'tag',
            tagType: rule.tagType,
            text: match[0]
          });
        } else {
          nextTokens.push({ type: 'text', text: match[0] });
        }

        lastIndex = matchEnd;
      }

      if (lastIndex < text.length) {
        nextTokens.push({ type: 'text', text: text.slice(lastIndex) });
      }
    }

    tokens = nextTokens;
  }

  return tokens;
}
