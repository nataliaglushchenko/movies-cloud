import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import cn from 'classnames';

import GenresCloud from './pages/GenresCloud';
import MatchedMovies from './pages/GenresCloud/MatchedMovies';
import Layout from './hoc/Layout';
import styles from './App.module.scss';

class App extends Component {
    render() {
        const { styles } = this.props;
        return (
            <div className={cn(styles['App'])}>
                <Layout>
                    <Switch>
                        <Route path="/view/:genre" component={MatchedMovies} />
                        <Route path="/view" component={GenresCloud} />
                        <Redirect from='/' exact to="/view" /> 
                        <Route render={()=><h1>Not Found</h1>} />
                    </Switch>
                </Layout>
            </div>
            
        );
    }
}

export default CSSModules(App, styles);