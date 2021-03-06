
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      {
        path: '/home',
        component: () => import('pages/Home/Home.vue'),
        children: [
          {
            path: '/home/imagemap',
            component: () => import('pages/Home/ImageMap.vue'),
          },
          { path: '/home/oxgen', 
            name: 'Oxygensaturation' , 
            component: () => import('pages/Health/Oxygensaturation.vue') 
          },
          { path: '/home/wharehouse', 
            name: 'Wharehouse' , 
            component: () => import('pages/Wharehouse/Wharehouse.vue') 
          },
          { path: '/home/LocationAr', 
            name: 'LocationAr' , 
            component: () => import('pages/Ar/LocationAr.vue') 
          },
          { path: '/home/MarkerAr', 
            name: 'MarkerAr' , 
            component: () => import('pages/Ar/MarkerAr.vue') 
          },
          { path: '/home/FoodMaps', 
            name: 'FoodMaps' , 
            component: () => import('pages/Maps/FoodMaps.vue') 
          },
          { path: '/home/Meet', 
            name: 'Meet' , 
            component: () => import('pages/Conference/Meet.vue') 
          },
          { path: '/home/Lottie', 
            name: 'Lottie' , 
            component: () => import('pages/Lottie/Lotties.vue') 
          },
        ]
      },
      {
        path: '/questions',
        component: () => import('pages/Questions/Questions.vue'),
        children: [
          {
            path: '/questions/answer',
            component: () => import('pages/Questions/Answer.vue'),
          }
        ]
      },
      {
        path: '/images',
        component: () => import('pages/Images/Images.vue'),
        children: [
          {
            path: '/images/:id',
            component: () => import('pages/Images/Image.vue'),
          }
        ]
      },
      {
        path: '/settings',
        component: () => import('pages/Setting/Setting.vue'),
      },
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
