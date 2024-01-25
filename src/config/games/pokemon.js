import preview from '../../assets/pokemon/setup.webp';

export default {
    is_available: true,
    name: 'Pokémon TCG',
    preview,
    fields: [
        {
            key: 'type',
            name: 'Type',
            type: 'enum',
        },
        {
            key: 'hp',
            name: 'HP',
            type: 'number',
        },
        {
            key: 'attack',
            name: 'Attack',
            type: 'text',
        },
        {
            key: 'retreat',
            name: 'Retreat Cost',
            type: 'number',
        },
        {
            key: 'regulation',
            name: 'Regulation Mark',
            type: 'enum',
        },
    ]
};
