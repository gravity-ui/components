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
        text: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum',
        name: 'Some text',
    },
    {
        type: 'document',
        url: 'https://preview.gravity-ui.com/icons',
        name: 'Html page',
        interactive: true,
    },
];
