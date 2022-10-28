import { createRouter,createWebHistory } from 'vue-router';
import PageIndex from './components/Page/index.vue';
import HomePage from './components/Page/HomePage.vue';
import Articles from './components/Page/Articles.vue';

import Login from './components/Login/Login.vue';
import Register from './components/Register/Register.vue';
import Article from './components/Page/Article.vue';
import Profile from './components/Page/Profile.vue';
import Collect from './components/Page/Collect.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			redirect: '/page/home',
		},
		{
			path: '/page',
			redirect: '/page/home',
		},
		{
			path: '/login',
			component: Login
		},
        {
			path: '/register',
			component: Register
		},
		{
			path: '/page',
			component: PageIndex,
			children: [
				{
					path: 'home',
					component: HomePage
				},
				{
					path: 'arts',
                    name:'arts',
					component: Articles
				},
				{
					path: 'profile',
					name: 'profile',
					component: Profile
				},
                {
					path: 'collect',
					name: 'collect',
					component: Collect
				},
				{
					//文章内容
					path: 'art/:id',
					name: 'art',
                    props: true,
					component: Article
				},
			]
		},
	]
});


export default router;