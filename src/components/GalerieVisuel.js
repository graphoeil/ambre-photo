// Imports
import React from 'react';
import { inject } from 'mobx-react';
import * as classNames from 'classnames';

// Variables
const $ = window.jQuery;
const URL_VISUEL = 'http://www.graphoeilmultimedia.com/reactDev/ambrePhoto/imagesWWW/';

// Classe
class GalerieVisuel extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.state = { isVisible:false };
		this.visuelRef = React.createRef();
	}

	// Render
	render(){

		// Variables
		const { visuel } = this.props;

		// Classe dynamique
		const visuelClass = classNames({
			'galerieVisuel':true,
			'visible':this.state.isVisible
		});

		// Return
		return(
			<div className={ visuelClass } ref={ this.visuelRef } onClick={ this.afficheLightBox.bind(this) }>
				<div className="conteneurVisuel">
					<div className="conteneurPhoto">
						<img src={ `${URL_VISUEL}${visuel.photo}` } alt={ visuel.legende } 
							onLoad={ this.handleImgLoad.bind(this) } />
						<span>{ visuel.legende }</span>
					</div>
				</div>
			</div>
		)
	};

	// Affiche la lightbox avec le visuel sélectionné
	afficheLightBox(){
		this.props.ambreStore.setVisuelLB(this.props.visuel);
	};

	// Image chargée, apparition du visuel, visuel suivant et isotope
	handleImgLoad(){
		this.setState({ isVisible:true }, function(){
			this.props.ambreStore.setVisuelEnCours();
			// Isotope
			const $visuel = $(this.visuelRef.current);
			$('.galerie').isotope().append($visuel).isotope('appended',$visuel).isotope('reloadItems');
		});
	};

};

// Export
export default inject('ambreStore')(GalerieVisuel);