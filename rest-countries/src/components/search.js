import React, { useState } from 'react'
import styles from '../scss/components/search.module.css'
import search from '../icons/search.svg'

export function Search({ handleSearchClick }) {

	const [name, setName] = useState('')


	function handleEnter(key) {
		if (key === 'Enter')
			handleSearchClick(name)
	}

	return (
		<div className={styles.container}>
			<img className={styles.search_icon} src={search} alt="" />
			<input  className={`${styles.input} no_decorate`}
					placeholder={'Search for a country...'} value={name} maxLength='25'
					onChange={e => setName(e.target.value)}
					onKeyDown={(e) => handleEnter(e.key)}
			></input>
		</div>
	)
}