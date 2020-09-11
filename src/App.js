import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import cn from 'classnames';

import GenresPage from './pages/genresPage';
import MoviesPage from './pages/moviesPage';
import Layout from './hoc/layout';
import styles from './app.module.scss';

class App extends Component {
    render() {
        const { styles } = this.props;
        return (
            <div className={cn(styles['App'])}>
                <Layout>
                    <Switch>
                        <Route path="/find-movies/:genre" component={MoviesPage} />
                        <Route path="/find-movies" component={GenresPage} />
                        <Redirect from='/' exact to="/find-movies" />
                        <Route render={()=><h1>Not Found</h1>} />
                    </Switch>
                </Layout>
            </div>
            
        );
    }
}

export default CSSModules(App, styles);