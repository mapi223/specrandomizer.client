import { IClassDetails } from "./classDetails";

const Font_b: string = '#020202'
const Font: string = '#FFFFFF'

export const TankSpecs = {
    list: ["Blood DK", "Vengeance DH", "Guardian Druid", "Brewmaster Monk", "Protection Paladin", "Protection Warrior"],

};
export const HealerSpecs = {
    list: ["Restoration Druid", "Preservation Evoker", "Holy Paladin", "Discipline Priest", "Holy Priest", "Mistweaver Monk", "Restoration Shaman"],
};

export const DamageSpecs = {
    list: [
        "Frost DK", "Unholy DK",
        "Devour DH", "Havoc DH",
        "Balance Druid", "Feral Druid",
        "Augmentation Evoker", "Devastation Evoker",
        "Beast Mastery Hunter", "Marksmanship Hunter", "Survival Hunter",
        "Arcane Mage", "Fire Mage", "Frost Mage",
        "Windwalker Monk",
        "Retribution Paladin",
        "Assassination Rogue", "Outlaw Rogue", "Subtlety Rogue",
        "Elemental Shaman", "Enhancement Shaman",
        "Affliction Warlock", "Demonology Warlock", "Destruction Warlock",
        "Arms Warrior", "Fury Warrior"
    ]
};


export const DKSpecs = {
    list: ["Blood", "Frost", "Unholy"],
    shortName: ["B", "F", "U"]
};
export const DHSpecs = {
    list: ["Devour", "Havoc", "Vengeance"],
    shortName: ["D", "H", "V"]
};
export const DruidSpecs = {
    list: ["Balance", "Feral", "Guardian", "Restoration"],
    shortName: ["B", "F", "G", "R"]
};
export const EvokerSpecs = {
    list: ["Augmentation", "Devastation", "Preservation"],
    shortName: ["A", "D", "P"]
};
export const HunterSpecs = {
    list: ["Beast Mastery", "Marksmanship", "Survival"],
    shortName: ["B", "M", "S"]
};
export const MageSpecs = {
    list: ["Arcane", "Fire", "Frost"],
    shortName: ["A", "Fi", "Fr"]
};
export const MonkSpecs = {
    list: ["Brewmaster", "Mistweaver", "Windwalker"],
    shortName: ["B", "M", "W"]
};
export const PaladinSpecs = {
    list: ["Holy", "Protection", "Retribution"],
    shortName: ["H", "P", "R"]
};
export const PriestSpecs = {
    list: ["Discipline", "Holy", "Shadow"],
    shortName: ["D", "H", "S"]
};
export const RogueSpecs = {
    list: ["Assassination", "Outlaw", "Subtlety"],
    shortName: ["A", "O", "S"]
};
export const ShamanSpecs = {
    list: ["Elemental", "Enhancement", "Restoration"],
    shortName: ["El", "En", "R"]
};
export const WarlockSpecs = {
    list: ["Affliction", "Demonology", "Destruction"],
    shortName: ["A", "Dem", "Des"]
};
export const WarriorSpecs = {
    list: ["Arms", "Fury", "Protection"],
    shortName: ["A", "F", "P"]
};

export const CLASSLIST: IClassDetails[] = [
    { id: 0, className: "Death Knight", color: '#C41E3A', font_color: Font, specs: DKSpecs },
    { id: 1, className: "Demon Hunter", color: '#A330C9', font_color: Font, specs: DHSpecs },
    { id: 2, className: "Druid", color: '#FF7C0A', font_color: Font_b, specs: DruidSpecs },
    { id: 3, className: "Evoker", color: '#33937F', font_color: Font, specs: EvokerSpecs },
    { id: 4, className: "Hunter", color: '#AAD372', font_color: Font_b, specs: HunterSpecs },
    { id: 5, className: "Mage", color: '#3FC7EB', font_color: Font_b, specs: MageSpecs },
    { id: 6, className: "Monk", color: '#00FF98', font_color: Font_b, specs: MonkSpecs },
    { id: 7, className: "Paladin", color: '#F48CBA', font_color: Font_b, specs: PaladinSpecs },
    { id: 8, className: "Priest", color: '#FFFFFF', font_color: Font_b, specs: PriestSpecs },
    { id: 9, className: "Rogue", color: '#FFF468', font_color: Font_b, specs: RogueSpecs },
    { id: 10, className: "Shaman", color: '#0070DD', font_color: Font, specs: ShamanSpecs },
    { id: 11, className: "Warlock", color: '#8788EE', font_color: Font_b, specs: WarlockSpecs },
    { id: 12, className: "Warrior", color: '#C69B6D', font_color: Font_b, specs: WarriorSpecs },
]


