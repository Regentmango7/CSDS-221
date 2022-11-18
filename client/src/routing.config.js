//imports
    import app from './App.vue';

//define routes
    export default [{
            path: '/app',
            name: 'app',
            component: app
        },{
            path: "*",
            name: 'default',
            redirect: "/app"
        }
    ];