//imports
    import app from './App.vue';

//define routes
    export default [{
            path: '/App',
            name: 'App',
            component: app
        },{
            path: "*",
            name: 'default',
            redirect: "/App"
        }
    ];