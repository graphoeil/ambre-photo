// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames';

// Classe
class NavButton extends React.Component{

	// Render
	render(){

		// Classes dynamiques
		const btnClass = classNames({
			'topLevelBtn':this.props.topLevelBtn,
			'noSsFamilleBtn':true,
			'active':this.props.ambreStore.pageActive === this.props.lien
		});

		// Return
		return <Link className={ btnClass } to={ this.props.lien } onClick={ this.handleClick.bind(this) }>
			{ this.props.texte }
		</Link>
	};

	// MAJ de la page active dans le state
	handleClick(){
		this.props.ambreStore.setPageActive(this.props.lien);
	};

};

// Export
export default inject('ambreStore')(observer(NavButton));