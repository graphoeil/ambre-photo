// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';

// Variables
const $ = window.jQuery;
const URL_VISUEL = 'http://www.graphoeilmultimedia.com/reactDev/ambrePhoto/imagesWWW/';

// Classe
class LightBox extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.lightBoxRef = React.createRef();
	}

	// Render
	render(){

		// Variables
		const { visuelLB } = this.props.ambreStore;

		// Return
		return(
			<div className="lightBox" ref={ this.lightBoxRef } onClick={ this.closeLightBox.bind(this) }>
				<div className="innerLightBox">
					<img src={ `${URL_VISUEL}${visuelLB.photo}` } alt={ visuelLB.legende } />
					<span>{ visuelLB.legende }</span>
				</div>
			</div>
		)
	};

	// Fermeture de la lightbox
	closeLightBox(){
		const $lightBox = $(this.lightBoxRef.current);
		$lightBox.fadeOut('slow', function(){
			this.props.ambreStore.showHideLB();
		}.bind(this));
	};

	// La lightbox vient d'être montée
	componentDidMount(){
		const $lightBox = $(this.lightBoxRef.current);
		$lightBox.fadeIn(1000);
	};

};

// Export
export default inject('ambreStore')(observer(LightBox));