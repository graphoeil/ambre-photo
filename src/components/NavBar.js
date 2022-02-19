// Imports
import React from 'react';
import { inject, observer } from 'mobx-react';
import * as classNames from 'classnames';
import NavButton from './NavButton';

// Variables
const Modernizr = window.Modernizr;
const $ = window.jQuery;

// Classe
class NavBar extends React.Component{

	// Constructeur
	constructor(props){
		super(props);
		this.state = { menuOuvert:false };
		this.menuRef = React.createRef();
		this.btnMenuMobileRef = React.createRef();
	};

	// Render
	render(){

		// Variables
		const { pageActive } = this.props.ambreStore;
		
		// Classes dynamiques
		const categoriesClass = classNames({
			'ssFamilleBtn':true,
			'active':pageActive === 'mariages' || pageActive === 'naissances' || pageActive === 'deces'
		});
		const pagesClass = classNames({
			'ssFamilleBtn':true,
			'active':pageActive === 'galerie' || pageActive === 'tarifs' || pageActive === 'blog'
		});
		const contactClass = classNames({
			'ssFamilleBtn':true,
			'active':pageActive === 'contact' || pageActive === 'acces'
		});
		const btnMenuMobileClass = classNames({
			'btnMenuMobile':true,
			'fondBlanc':!this.state.menuOuvert,
			'fondGris':this.state.menuOuvert
		});
		const iconeMenuMobileClass = classNames({
			'fal fa-bars':!this.state.menuOuvert,
			'fal fa-times':this.state.menuOuvert
		});

		// Return
		return(
			<React.Fragment>

				{/* Bouton menu mobile */}
				<div className={ btnMenuMobileClass } onClick={ this.showHideMenu.bind(this) } ref={ this.btnMenuMobileRef }>
					<i className={ iconeMenuMobileClass }></i>
					Menu
				</div>
				{/* Bouton menu mobile */}

				{/* Navigation */}
				<nav ref={ this.menuRef }>

					{/* Top level menu */}
					<ul className="topLevelMenu">

						{/* Accueil */}
						<li><NavButton topLevelBtn={ true } lien="accueil" texte="Accueil"/></li>
						{/* Accueil */}

						{/* Catégories */}
						<li>
							<span className="subMenuIcone"><i className="far fa-chevron-down"></i></span>
							<button className={ categoriesClass }>Catégories</button>
							<ul className="subLevelMenu">
								<li><NavButton topLevelBtn={ false } lien="mariages" texte="Mariages"/></li>
								<li><NavButton topLevelBtn={ false } lien="naissances" texte="Naissances"/></li>
								<li><NavButton topLevelBtn={ false } lien="deces" texte="Décès"/></li>
							</ul>
						</li>
						{/* Catégories */}

						{/* Pages */}
						<li>
							<span className="subMenuIcone"><i className="far fa-chevron-down"></i></span>
							<button className={ pagesClass }>Pages</button>
							<ul className="subLevelMenu">
								<li><NavButton topLevelBtn={ false } lien="galerie" texte="Galerie"/></li>
								<li><NavButton topLevelBtn={ false } lien="tarifs" texte="Tarifs"/></li>
								<li><NavButton topLevelBtn={ false } lien="blog" texte="Blog"/></li>
							</ul>
						</li>
						{/* Pages */}

						{/* À propos */}
						<li><NavButton topLevelBtn={ true } lien="aPropos" texte="À propos"/></li>
						{/* À propos */}

						{/* Contact */}
						<li>
							<span className="subMenuIcone"><i className="far fa-chevron-down"></i></span>
							<button className={ contactClass }>Contact</button>
							<ul className="subLevelMenu">
								<li><NavButton topLevelBtn={ false } lien="contact" texte="Nous écrire"/></li>
								<li><NavButton topLevelBtn={ false } lien="acces" texte="Plan d'accès"/></li>
							</ul>
						</li>
						{/* Contact */}

						{/* Boutique */}
						<li><NavButton topLevelBtn={ true } lien="boutique" texte="Boutique"/></li>
						{/* Boutique */}

					</ul>
					{/* Top level menu */}

				</nav>
				{/* Navigation */}

			</React.Fragment>
		);

	};

	// Afficher, masquer le menu
	showHideMenu(){
		const { menuOuvert } = this.state;
		const $menu = $(this.menuRef.current);
		if (menuOuvert){
			this.setState({ menuOuvert:false });
			$menu.slideUp();
		} else {
			this.setState({ menuOuvert:true });
			$menu.slideDown();
		}
	};

	// Gestion menu mobile
	componentDidMount(){

		// Variables
		const $menu = $(this.menuRef.current);
		const $topLevelBtn = $menu.find('.topLevelBtn');
		const $subMenuIcones = $menu.find('.subMenuIcone');
		const $ssFamilleBtn = $menu.find('.ssFamilleBtn');
		const $subLevelMenu = $menu.find('.subLevelMenu');

		// Modernizr
		let isTouch = false;
		if (Modernizr.touchevents){ isTouch = true; }

		// Afficher, masquer les sous-menus
		$ssFamilleBtn.on('click', function(){
			// Reset de tous les ssMenus
			$subMenuIcones.removeClass('tourne');
			$subLevelMenu.slideUp('fast');
			// Ce sous-menu
			const $ssMenu = $(this).next('ul');
			const $iconeSsMenu = $(this).prev('.subMenuIcone');
			// Animation
			if ($ssMenu.is(':visible')){
				$ssMenu.slideUp();
			} else {
				$ssMenu.slideDown();
				$iconeSsMenu.addClass('tourne');
			}
		});

		// Masquer les sous-menus lors d'un clic ou d'un mouseEnter sur un topLevelBtn
		$topLevelBtn.on('click mouseenter', function(){
			$subLevelMenu.slideUp('fast');
			$subMenuIcones.removeClass('tourne');
		});

		// Hover sur les ssFamilleBtn
		if (!isTouch){
			$ssFamilleBtn.on('mouseenter', function(){
				$(this).trigger('click');
			});
			$subLevelMenu.on('mouseleave', function(){
				$(this).slideUp();
			});
		}

		// Window resize, fermeture du menu et des sous-menus
		let timerResize = 0;
		const $window = $(window);
		$window.on('resize orientationchange', () => {
			if (timerResize){ clearTimeout(timerResize); }
			timerResize = setTimeout(() => {
				if ($window.width() >= 768){
					$menu.removeAttr('style');
					$subMenuIcones.removeClass('tourne');
					$subLevelMenu.hide();
					this.setState({ menuOuvert:false });
				}
			},200);
		}).trigger('resize');

	};

};

// Export
export default inject('ambreStore')(observer(NavBar));