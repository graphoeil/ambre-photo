// Imports
import React, { useEffect } from 'react';

// Fonction
const Footer = () => {
	// Équivalent componentDidMount
	useEffect(() => {
		console.log('Le footer est monté');
	},[]);
	return(
		<footer><b>Graphoeil</b> | 2021</footer>
	);
};

// Export
export default Footer;