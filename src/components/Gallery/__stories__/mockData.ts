export const images = [
    'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
    'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
    'https://cs4.pikabu.ru/post_img/big/2015/02/27/6/1425024947_2006737473.jpeg',
    'https://i.pinimg.com/originals/ef/7b/97/ef7b9724ad06cd6dfce92193e95a5caa.jpg',
    'https://avatars.mds.yandex.net/i?id=ea31df78678a1b3f4f1fb7199090831d_l-5235412-images-thumbs&n=13',
    'https://i.ytimg.com/vi/WA63GQpLzjA/maxresdefault.jpg',
    'https://i.pinimg.com/originals/02/eb/fd/02ebfd63d5435ec87c7413b8b2428214.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/2b800731080995.5640a39521da5.jpg',
    'https://pic.rutubelist.ru/video/7a/1b/7a1b88f88ff7a470ea6f8131d51c2c5c.jpg',
    'https://i.pinimg.com/originals/4b/c7/ed/4bc7ed612f2080303644deb0f857b70f.jpg',
    'https://img1.reactor.cc/pics/post/нейроарт-нейронные-сети-красивые-картинки-art-7821877.png',
    'https://steamuserimages-a.akamaihd.net/ugc/841461304090603934/D3243F5856FEAE2052FC7CDB748B5BB65E6B247A/?imw=512&amp;imh=306&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
    'https://celes.club/uploads/posts/2022-06/1654752045_50-celes-club-p-multyashnii-kosmos-oboi-krasivie-53.jpg',
    // duplicate the list to show the previews scroll
    'https://i.pinimg.com/originals/d8/bd/b4/d8bdb45a931b4265bec8e8d3f15021bf.jpg',
    'https://i.pinimg.com/originals/c2/31/a0/c231a069c5e24099723564dae736f438.jpg',
    'https://cs4.pikabu.ru/post_img/big/2015/02/27/6/1425024947_2006737473.jpeg',
    'https://i.pinimg.com/originals/ef/7b/97/ef7b9724ad06cd6dfce92193e95a5caa.jpg',
    'https://avatars.mds.yandex.net/i?id=ea31df78678a1b3f4f1fb7199090831d_l-5235412-images-thumbs&n=13',
    'https://i.ytimg.com/vi/WA63GQpLzjA/maxresdefault.jpg',
    'https://i.pinimg.com/originals/02/eb/fd/02ebfd63d5435ec87c7413b8b2428214.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/2b800731080995.5640a39521da5.jpg',
    'https://pic.rutubelist.ru/video/7a/1b/7a1b88f88ff7a470ea6f8131d51c2c5c.jpg',
    'https://i.pinimg.com/originals/4b/c7/ed/4bc7ed612f2080303644deb0f857b70f.jpg',
    'https://img1.reactor.cc/pics/post/нейроарт-нейронные-сети-красивые-картинки-art-7821877.png',
    'https://steamuserimages-a.akamaihd.net/ugc/841461304090603934/D3243F5856FEAE2052FC7CDB748B5BB65E6B247A/?imw=512&amp;imh=306&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true',
    'https://celes.club/uploads/posts/2022-06/1654752045_50-celes-club-p-multyashnii-kosmos-oboi-krasivie-53.jpg',
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
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        name: 'Bunny Film',
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
