import {PaletteOption} from '@gravity-ui/uikit';

const reactionsAvatar = {
    spongeBob:
        'data:image/png;base64,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',
    patrick:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADAREAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAABwACBQYIAf/EACoQAAIBAwQBBAIBBQAAAAAAAAECAwQFEQAGEiExBxNBUSJhFEJScZHR/8QAGwEAAgIDAQAAAAAAAAAAAAAABgcFCAADBAL/xAAwEQABAgUDAwEHBAMAAAAAAAABAhEAAwQFIRIxQQZRYYETFBUiMpHwM0KhsXHB0f/aAAwDAQACEQMRAD8ALdZc5nu9O9NVl6QrGywxqCkyMrlnLHvoqMYxj586lkkrmBlY/veK9gMkuMwxNxS1kE81MqtDEwUtxPf7X7H7GuWZcZEisRTLGFAfN5Jx6eYPbZ0fUXWxz7vTrdUtRGhtwkAqL984DZA7tCobtU1VWsbuqL3yzhev+/rRFOlJlyyoDMAclImLAJxHbjcp6WVfbnDIw6/uBHRyPjWUspM1J1DI+3p3j1PQJZGk4/N4FtdvtZ/cUzmoVnIDOqBSSe8Keh+We8efOun4Ks7Zy3H5v/MYFNBA9MKiz70o7hPuGrNRSRJLHEsjtTRvJ7YX25uAYEcWfA44zx8eQBXyRKk3BKKhWNHZiCCcHzjiLF9B++I6dmKo0ur2xxuGKUg4543iI3lu60WHc1dQ29uFBEy/xxhsBOIIClvyKg5AJ7wBnvTIs9OLlRIqZRcFx6jEJDqK2TbRc5tLMTp2UB4VnDcO/wDUVy5+pFOtKwjcMW6ZuXEj/H2dTiLQsGB1GTmKft70xvG4qx4WkipKYANLOX58BnoKB8+caiLj1lZqSQr2CVTFq2BdI+/ABzjLwyunuh6+9zyCoIlp+pW5zwByT5wOYOG0dqUO07PHQ0jvULzMrzTMGZ3PRb6HQxjSHuVyn3WpVVT/AKj27f7/AMxaezWWlsNGmhpAdIJLnck7k/8ABgQzcmz7Pf2E9woI6h1XgXBKuF78EfWT1rbb71cbU/uU4oByQNj6FxGXGwWu8hq+nSsgMCRkeAQxb1gH7k9PKykvVdT23jU0KSYiaVvyI/13g5GdPu0dc0U+ilqr3E392lONzkZ5HEVS6j6XVbLrOpqL9NLM5yHALeW2B5Eb5vnpNT3S1qlFGlBXoQYmMfFGGe1OPg/H0dJmulJnSw40kcwy7BcJlkqFKU5lq3SGyeCH5H8jEBW122puUEktvkpqqD3WQqxeFkYHDL2DkA576z3pUXK8TrJUGluVOUKYKDKSr5SHG2HIy24cQaL619lMKZ9OQMMygS3D8P6xA1FbeKi4x0MdBJQSzRyYNQf6VJy2ADjwQCetGZlU/wAPnXEVSFIRpDIOtWpYdKQ+hJIcagCopzgkGNlV1WTIXMp0gNy+oudsYGOclu0aLoPTiy09vpKcW2JZBGqu8hyxbAz333nU1Io6mSlprADtmFZWVi7jUKnzlalq/MeI/9k=',
    squidward:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAABgcIBAX/xAAsEAACAQMDAQcDBQAAAAAAAAABAgMEBREAEiEGEyIxQVFhoRRxgTJCYpGx/8QAGAEAAgMAAAAAAAAAAAAAAAAAAgMEBQb/xAAgEQACAgEDBQAAAAAAAAAAAAABAgADEQQTMSFBUWHw/9oADAMBAAIRAxEAPwDdHU9zlpJBRU0hgbaHllH6gD4KPTjxPuNDO3WNm2kTFlw7AkbifE5AJ+dMev6F7dJLdSjPSdiDIUBO1lB4P3AGPfWd6nr64l62okqOyiFR9HM0kJ2Us+9VEIJHdk3Oq7TzlhxkjUYsqcmZ/U7hsIIJHqV6AiVzLHKFmUdxkyGTjHJGCeRny0u6euz17/R1ZEk20tHNjBfHiCPXzz5jPpzOujLxVXGimp69WjrqRwjpJGY3Kkd1ipAx5j8ae9G26Wsuy1KqewpgxZ/IsVICj35J/HvoujCDpHcWALwY1u96oLTbZZK+XZC6sm0cs+Qe6o9dSJqKzgzxXK00lTb6+s+vq6XYFSSqDJIs59ZA8SHcTyV0/v1DT9QWp4pIxJNGrNAc4w+OP7wPjR7p22pcbvGtTTu1PGHaQOGTadpAHlzk+HtpNlVdww4zLS229LFFRx93ndYr1a7t1HV1d1ETQSRKkJm76qQ37iMgHxPPHOqBII4IdkaLHGowFQAAfYDQ+t6Hss770aeA/wAXDfLAn516k9wSGFYk4RFCgZzwBgf5o0Va0CLwI2oWLncxnzP/2Q==',
};

export type ReactionsMockUser = {name: string; avatar: string};

export const reactionsMockUser = {
    spongeBob: {name: 'Sponge Bob', avatar: reactionsAvatar.spongeBob},
    patrick: {name: 'Patrick', avatar: reactionsAvatar.patrick},
    squidward: {name: 'Squidward', avatar: reactionsAvatar.squidward},
} satisfies Record<string, ReactionsMockUser>;

const baseMockOption = {
    'smiling-face': {content: '😊'},
    heart: {content: '❤️'},
    'thumbs-up': {content: '👍'},
    laughing: {content: '😂'},
    'hearts-eyes': {content: '😍'},
    cool: {content: '😎'},
    tongue: {content: '😛'},
    angry: {content: '😡'},
    sad: {content: '😢'},
    surprised: {content: '😯'},
    'face-screaming': {content: '😱'},
    'smiling-face-with-open-hands': {
        content: '🤗',
    },
    nauseated: {content: '🤢'},
    'lying-face': {content: '🤥'},
    'star-struck': {content: '🤩'},
    'face-with-hand-over-mouth': {
        content: '🤭',
    },
    vomiting: {content: '🤮'},
    partying: {content: '🥳'},
    woozy: {content: '🥴'},
    'cold-face': {content: '🥶'},
};

export const reactionsPalletteMockOption = baseMockOption as Record<
    keyof typeof baseMockOption,
    PaletteOption
>;

for (const value of Object.keys(reactionsPalletteMockOption)) {
    reactionsPalletteMockOption[value as keyof typeof baseMockOption].value = value;
    reactionsPalletteMockOption[value as keyof typeof baseMockOption].title = value;
}

export const reactionsPalletteMockOptions = Object.values(reactionsPalletteMockOption);
