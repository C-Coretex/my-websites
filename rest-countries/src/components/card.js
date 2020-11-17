import React from 'react'
import styles from '../scss/components/card.module.css'


export function Card({ country }) {
	return (
		<div className={`${styles.container} ${styles.card} ${styles.button}`}>
				<img className={styles.flag} src={country.flag} alt={`Flag of the ${country.name}`} />

				<div className={styles.info}>
					<p className={styles.name}>{country.name}</p>

					<div className={styles.rest_info}>
						<p><span className={styles.bold}>Population:</span> {country.population.toLocaleString(`de-DE`)}</p>
						<p><span className={styles.bold}>Region:</span> {country.region}</p>
						<p><span className={styles.bold}>Capital:</span> {country.capital}</p>
					</div>
				</div>
		</div>
	)
}