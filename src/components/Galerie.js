// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import GalerieVisuel from './GalerieVisuel';

// Classe
class Galerie extends React.Component{

	// Render
	render(){
		return(
			<section className="galerie">
				{
					this.props.ambreStore.visuelsAmbreDOM.map((visuel, index) => {
						return <GalerieVisuel key={ visuel.id } visuel={ visuel }/>
					})
				}
			</section>
		)
	};

};

// Export
export default inject('ambreStore')(observer(Galerie));