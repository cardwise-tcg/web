import preview from '../../assets/lorcana/setup.png';

export default {
    is_available: true,
    name: 'Lorcana',
    preview,
    fields: [
        {
            key: 'ink',
            name: 'Ink',
            type: 'enum',
            values: [
                'Amber',
                'Amethyst',
                'Ruby',
                'Emerald',
                'Sapphire',
                'Steel'
            ]
        },
        {
            key: 'lore',
            name: 'Lore',
            type: 'number',
        },
        {
            key: 'cost',
            name: 'Cost',
            type: 'number',
        },
        {
            key: 'inkable',
            name: 'Inkable',
            type: 'boolean',
        },
        {
            key: 'willpower',
            name: 'Willpower',
            type: 'number',
        },
        {
            key: 'strength',
            name: 'Strength',
            type: 'number',
        },
        {
            key: 'rarity',
            name: 'Rarity',
            type: 'enum',
            values: [
                'Common',
                'Uncommon',
                'Rare',
                'Super Rare',
                'Legendary',
                'Enchanted',
                'Promo'
            ]
        },
        {
            key: 'classifications',
            name: 'Classifications',
            type: 'text',
        },
        {
            key: 'text',
            name: 'Text',
            type: 'text',
        }
    ]
};
