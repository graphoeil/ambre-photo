// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './css/displayMain.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Galerie from './components/Galerie';
import LightBox from './components/LightBox';
import Footer from './components/Footer';

// Classe
class App extends React.Component{

	// Render
	render(){
		return(
			<Router>

				{/* Header */}
				<Header/>
				{/* Header */}

				{/* NavBar */}
				<NavBar/>
				{/* NavBar */}

				{/* Galerie */}
				<Galerie/>
				{/* Galerie */}

				{/* LightBox */}
				{
					this.props.ambreStore.lightBoxVisible && <LightBox/>
				}
				{/* LightBox */}

				{/* Footer */}
				{
					this.props.ambreStore.footerVisible && <Footer/>
				}
				{/* Footer */}

				{/* Switch */}
				<Switch>
					<Redirect from="*" to="/reactDev/ambrePhoto/"/>
				</Switch>
				{/* Switch */}
				
			</Router>
		);
	};

};

// Export
export default inject('ambreStore')(observer(App));