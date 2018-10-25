import App from '../containers/App';
import {
    UserLogin,
    Dashboard,
    Customer,
    Kanban,
    OrderList,
} from '../containers/pages';

const routes = [{
    component: App,
    routes: [{
            path: '/',
            root: true
        },
        {
            component: UserLogin,
            path: '/login'
        },
        {
            component: Dashboard,
            path: '/dashboard',
            requireLogin: '/login',
        },
        {
            component: Customer,
            path: '/customer',
            requireLogin: '/login',
        },
        {
            component: Kanban,
            path: '/kanban',
            requireLogin: '/login',
        },
        {
            component: OrderList,
            path: '/order',
            requireLogin: '/login',
        },
        {
            component: UserLogin,
            path: '/*',
            requireLogin: '/login',
        },
    ]
}];

export default routes;