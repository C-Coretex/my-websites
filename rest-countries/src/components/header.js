import React from 'react'
import styles from '../scss/components/header.module.css'

export function Header() {

	return (
		<div className={styles.container}>
			<a href="#">
				<div>
					<h1>Where in the world?</h1>
				</div>
			</a>
		</div>
	)
}