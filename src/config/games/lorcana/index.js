import preview from '../../../assets/lorcana/setup.png';

import {
    CARD_HEIGHT,
    CARD_WIDTH,
    hideClassifications,
    hideCost,
    hideInk,
    hideInkable,
    hideLore,
    hideRarity,
    hideStrength,
    hideText,
    hideWillpower,
} from './canvas';
import { generate } from './questions';

export default {
    canvas: {
        CARD_WIDTH,
        CARD_HEIGHT,
        hideInk,
        hideLore,
        hideCost,
        hideInkable,
        hideWillpower,
        hideStrength,
        hideRarity,
        hideClassifications,
        hideText,
    },
    questions: {
        generate,
    },
    is_available: true,
    name: 'Lorcana',
    preview,
    api: {
        cards: 'https://api.cardwise.itodorova.dev/lorcana/cards',
    },
    cdn: {
        cards: 'https://cdn.cardwise.itodorova.dev/lorcana',
    },
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
            ],
            types: ['Character', 'Item', 'Action', 'Song'],
        },
        {
            key: 'lore',
            name: 'Lore',
            type: 'number',
            characterOnly: true,
            types: ['Character'],
        },
        {
            key: 'cost',
            name: 'Cost',
            type: 'number',
            types: ['Character', 'Item', 'Action', 'Song'],
        },
        {
            key: 'inkable',
            name: 'Inkable',
            type: 'boolean',
            types: ['Character', 'Item', 'Action', 'Song'],
        },
        {
            key: 'willpower',
            name: 'Willpower',
            type: 'number',
            types: ['Character'],
        },
        {
            key: 'strength',
            name: 'Strength',
            type: 'number',
            types: ['Character'],
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
            ],
            types: ['Character', 'Item', 'Action', 'Song'],
        },
        {
            key: 'classifications',
            name: 'Classifications',
            type: 'text',
            types: ['Character'],
        },
        {
            key: 'text',
            name: 'Text',
            type: 'text',
            types: ['Character', 'Item', 'Action', 'Song'],
        }
    ],
    sets: [
        {
            key: 'tfc',
            name: 'The First Chapter',
        },
        {
            key: 'rfb',
            name: 'Rise of the Floodborn'
        },
    ]
};
