import React from 'react'
import styles from '../scss/components/search.module.css'
import search from '../icons/search.svg'

export function Search() {
	return (
		<div className={styles.container}>
			<img src={search} alt=""/>
			<input className={`${styles.input} no_decorate`} placeholder={'Search for a country...'} maxLength='25'></input>
		</div>
	)
}