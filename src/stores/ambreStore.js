// Imports
import { makeObservable, action, observable } from "mobx";
import { VisuelsAmbre } from '../data/ambreData';

// Classe
class AmbreStore{

	// Constructeur
	constructor(){
		// Variables observables
		makeObservable(this,{
			// Menu
			pageActive:observable,
			// Galerie
			visuelsAmbreDOM:observable,
			// LightBox
			lightBoxVisible:observable,
			visuelLB:observable,
			// Footer
			footerVisible:observable
		});
	};

	// Variables
	//
	// Menu
	pageActive = 'accueil';
	// Galerie
	visuelsAmbre = VisuelsAmbre.slice(0);
	visuelsAmbreDOM = this.visuelsAmbre.splice(0,1);
	visuelEnCours = -1;
	nombreDeVisuels = this.visuelsAmbre.length - 1;
	// LigthBox
	lightBoxVisible = false;
	visuelLB = {};
	// Footer
	footerVisible = false;

	// Méthodes
	//
	// Menu
	setPageActive = action((page) => {
		this.pageActive = page;
	});
	// Galerie
	setVisuelEnCours = action(() => {
		if (this.visuelEnCours < this.nombreDeVisuels){
			this.visuelEnCours++;
			this.visuelsAmbreDOM.push(this.visuelsAmbre[this.visuelEnCours]);
		}
		// Footer visible
		if (this.visuelEnCours === this.nombreDeVisuels){
			this.footerVisible = true;
		}
	});
	// LigthBox
	setVisuelLB = action((visuel) => {
		this.visuelLB = visuel;
		this.showHideLB();
	});
	showHideLB = action(() => {
		this.lightBoxVisible = !this.lightBoxVisible;
	});

};

// Export
export default AmbreStore;