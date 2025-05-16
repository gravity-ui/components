export const images = [
    {
        name: 'Resting',
        url: 'https://i.pinimg.com/originals/e7/44/1a/e7441aebde7c4d5a5afc476d5fa87082.jpg',
    },
    {
        name: 'Woke up',
        url: 'https://i.pinimg.com/736x/46/81/f0/4681f0072c3b5b8a96fdf78c4e12037c.jpg',
    },
    {
        name: 'Sleeping',
        url: 'https://i.pinimg.com/736x/ae/2a/a3/ae2aa360b9c18d0be08ef7279ab81638.jpg',
    },
    {
        name: 'Walking',
        url: 'https://i.pinimg.com/originals/42/b4/eb/42b4ebb23e452387a84c3ad02295003f.jpg',
    },
    {
        name: 'Driving',
        url: 'https://i.pinimg.com/736x/3a/e0/af/3ae0af7c666a284847d682156b8a6496.jpg',
    },
    {
        name: 'Sea',
        url: 'https://i.pinimg.com/736x/30/91/28/3091283eeff577749c5e3c81a9af7ce1.jpg',
    },
    {
        name: 'Running',
        url: 'https://i.pinimg.com/736x/61/ce/22/61ce22263ae275efa9b9c7b02b3dea61.jpg',
    },
    {
        name: "Didn't understand",
        url: 'https://i.pinimg.com/736x/72/70/a6/7270a6d918468fcce5c297afc281bf35.jpg',
    },
    {
        name: 'Hidden',
        url: 'https://i.pinimg.com/originals/cc/8d/cf/cc8dcfb1f6bcb54a2836019558027ef7.jpg',
    },
    {
        name: 'Garden',
        url: 'https://i.pinimg.com/736x/cd/74/75/cd7475dd2fa19d339e147b627896c5d4.jpg',
    },
    {
        name: 'Flower',
        url: 'https://i.pinimg.com/736x/aa/21/dd/aa21ddd2b3de5298953ca0762838951e.jpg',
    },
    {
        name: 'Forest',
        url: 'https://i.pinimg.com/originals/9c/3a/16/9c3a161254af0369c2a32bae240da2ff.jpg',
    },
    {
        name: 'Upset',
        url: 'https://i.pinimg.com/originals/d0/48/41/d048413c59db4dd7d1e332da991ce347.jpg',
    },
    {
        name: 'Thinking',
        url: 'https://i.pinimg.com/736x/a9/4a/4b/a94a4b6810787f415166bc9d0bef71eb.jpg',
    },
    {
        name: 'Field',
        url: 'https://i.pinimg.com/736x/9c/b2/d1/9cb2d19f5cf6bdb53b7c1f42f480db3f.jpg',
    },
    {
        name: 'Sitting',
        url: 'https://i.pinimg.com/736x/34/94/5e/34945e08218f073f4f1d3b147108b06a.jpg',
    },
    {
        name: 'Doggy',
        url: 'https://i.pinimg.com/originals/a6/30/93/a6309348c1dab1899d022b8759dc659b.jpg',
    },
    {
        name: 'Eating',
        url: 'https://i.pinimg.com/736x/69/e0/aa/69e0aac5a17f8790da23dcc379e6fd05.jpg',
    },
    {
        name: 'Gift',
        url: 'https://i.pinimg.com/736x/e3/f2/b4/e3f2b4f87a0ae9744a0b14c81710463c.jpg',
    },
    {name: 'Happy', url: 'https://i.pinimg.com/736x/f0/d4/01/f0d4011c75b92f165dbab83c8654ebf1.jpg'},
    {
        name: 'Morning',
        url: 'https://i.pinimg.com/736x/69/51/5a/69515a0da57d33b5df80d5af0c14ef7e.jpg',
    },
    {
        name: 'Waiting',
        url: 'https://i.pinimg.com/736x/07/b6/f5/07b6f527be3860832e55e6ec041766b6.jpg',
    },
    {
        name: 'Cool',
        url: 'https://i.pinimg.com/originals/32/a3/30/32a33050f32ba74c2b66456d458cb792.jpg',
    },
    {
        name: 'Travelling',
        url: 'https://i.pinimg.com/originals/07/73/12/077312668712ae5aba52766b5b3e2b8e.jpg',
    },
    {
        name: 'Fashion',
        url: 'https://i.pinimg.com/736x/5d/15/35/5d1535227d2eb616b21113d69e5cf49b.jpg',
    },
    {
        name: 'Washed',
        url: 'https://i.pinimg.com/736x/12/e5/5a/12e55a138ef6345d359d9f6cf0715a5d.jpg',
    },
    {
        name: 'Sleep soon',
        url: 'https://i.pinimg.com/736x/90/da/f6/90daf6e058bc377b1a3c1cf53d63bde7.jpg',
    },
    {
        name: 'Friends',
        url: 'https://i.pinimg.com/originals/0f/e4/66/0fe4667784f51ac62a7fbb8c84b16f2f.jpg',
    },
    {
        name: 'The gentleman',
        url: 'https://i.pinimg.com/736x/ed/11/1e/ed111e9003c2d972b7e09816deef26de.jpg',
    },
    {
        name: 'Basket',
        url: 'https://i.pinimg.com/736x/cf/4e/ac/cf4eac1954a1c1b4c9d43dbb8f8752a8.jpg',
    },
    {
        name: 'Winter',
        url: 'https://i.pinimg.com/originals/ee/50/90/ee509026a73aae62ef3ffd1860f2db5f.jpg',
    },
    {
        name: 'Flowers',
        url: 'https://i.pinimg.com/originals/d8/a0/53/d8a0536b3855ee1cdeaaf1eb3bb71aed.jpg',
    },
];

export type GalleryFile =
    | {
          name: string;
          type: 'image' | 'video' | 'document';
          url: string;
          interactive?: boolean;
      }
    | {name: string; type: 'text'; text: string; interactive?: boolean};

export const files: GalleryFile[] = [
    {
        type: 'image',
        url: 'https://santreyd.ru/upload/iblock/acc/accd0c751590e792f7e43a05f22472f9.jpg',
        name: 'Corgi image',
    },
    {
        type: 'video',
        url: 'https://storage.yandexcloud.net/uikit-storybook-assets/sample_960x400_ocean_with_audio.mp4',
        name: 'Video',
        interactive: true,
    },
    {
        type: 'text',
        text: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Quis dis rutrum vitae habitasse sapien dictum natoque finibus? Vel dolor ullamcorper arcu conubia adipiscing aenean etiam volutpat. Nulla ante arcu curabitur phasellus elementum dolor. Imperdiet bibendum nam sodales rutrum egestas inceptos nulla. Aliquam ipsum nulla blandit ultrices; lacinia metus suscipit porttitor. Eros imperdiet commodo venenatis luctus maximus nostra nunc. Nibh nam molestie; ornare sem ligula tempor Nec ornare nisl primis gravida dolor accumsan est est. Varius maximus ad quisque ex magna iaculis. Metus ad phasellus habitasse, luctus vivamus duis. Parturient scelerisque massa semper penatibus mollis rhoncus massa. Donec gravida class aenean erat vulputate luctus aenean. Amus consectetur tortor platea feugiat varius non vulputate. Augue aliquet quisque ultricies cursus aliquet nunc. Convallis metus dapibus semper convallis dui, nibh fusce phasellus. Proin vestibulum sollicitudin accumsan nulla libero habitasse cursus lobortis. Nulla pharetra dapibus quam viverra luctus Integer fermentum id iaculis commodo porta. Proin dui cubilia faucibus litora tellus praesent erat aliquet. Senectus porta ac penatibus; tempor lectus erat. Facilisis semper ligula habitant at etiam magna adipiscing torquent varius. Donec ultricies arcu curae nunc rhoncus. Torquent sollicitudin rutrum tortor libero sem elementum augue elit. Adipiscing sit ornare interdum curabitur lobortis. Malesuada at sollicitudin pharetra leo ad lacus enim natoque. Fames mauris porta phasellus taciti laoreet ac consectetur tortor Dolor quis phasellus; tempus taciti lorem mus sollicitudin ac. Inceptos metus aenean hendrerit condimentum sodales. Vulputate sagittis massa senectus consectetur; vivamus mauris torquent eget? Convallis malesuada mattis porta, sodales a ornare. Cubilia vestibulum fringilla vivamus ex suscipit tempor. Porttitor torquent sed rutrum commodo metus platea urna volutpat magnis. Duis dolor tincidunt sodales enim nullam nam aliquam aliquam Tempor hac porttitor libero venenatis pretium odio dis pharetra. Montes odio condimentum nam morbi nec sociosqu aliquet. Diam fringilla metus quisque ultricies netus hac. Natoque duis torquent sagittis lobortis nullam. Quisque ac rhoncus eget ullamcorper aliquam nullam. Blandit adipiscing iaculis magna tristique luctus curabitur montes viverra duis. Neque nisl luctus libero auctor donec penatibus.',
        name: 'Some text',
    },
    {
        type: 'document',
        url: 'https://preview.gravity-ui.com/icons',
        name: 'Html page',
        interactive: true,
    },
];
