import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import GenresPage from './pages/genresPage';
import MoviesPage from './pages/moviesPage';
import Layout from './hoc/layout';

function GenresPageWrapped() {
    return (
        <Layout>
            <GenresPage />
        </Layout>
    );
}

function MoviesPageWrapped() {
    return (
        <Layout>
            <MoviesPage />
        </Layout>
    );
}

function App () {
    return (
        <Switch>
            <Route path="/:mode/:genre" exact component={MoviesPageWrapped} />
            <Route path="/" exact component={GenresPageWrapped} />
            <Redirect to="/" />
        </Switch>
    );
}

export default App;