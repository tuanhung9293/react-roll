import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Root } from './containers';
import { routes } from './routes';
import { I18nextProvider } from "react-i18next";
import i18n from "./languages/i18n";

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Root routes={routes} />
    </I18nextProvider>,
    document.getElementById('root'));
registerServiceWorker();
