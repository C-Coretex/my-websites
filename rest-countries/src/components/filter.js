import React, { useState, useEffect } from 'react'

import onClickOutside from 'react-onclickoutside'

import styles from '../scss/components/filter.module.css'




function Filter({ uniqueKeyGenerator, regions, handleRegionChange }) {
	const [isOpen, openAndClose] = useState(false);
	const [selectedItems, changeItem] = useState({})

	Filter.handleClickOutside = () => {
		openAndClose(false)
	}

	function selectItem(item) {
		let tempSelectedItem = {}
		Object.entries(regions).forEach(region => {
			tempSelectedItem[region[1]] = false
		})

		tempSelectedItem[item] = !selectedItems[item]

		changeItem(tempSelectedItem);

		if (tempSelectedItem[item] === true)
			handleRegionChange(item)
		else {
			handleRegionChange('')
			openAndClose(!isOpen)
		}
	}

	function getSelectedItem() {
		return Object.keys(selectedItems).find(key => selectedItems[key] === true)
	}

	useEffect(() => {
		let tempSelectedItem = {}
		Object.entries(regions).forEach(region => {
			tempSelectedItem[region[1]] = false
		})

		changeItem(tempSelectedItem)

	}, [regions])

	return (
		<div className={styles.container}>
			<div className={`${styles.select} ${isOpen ? styles.open : ''}`}>
				<div className={styles.select_trigger} onClick={() => openAndClose(!isOpen)}>
					<span>{getSelectedItem() ? getSelectedItem() : 'Filter by Region'}</span>
					<div className={styles.arrow}></div>
				</div>
				<div className={`${styles.option_list} no_decorate`}>
					{Object.entries(selectedItems).map(region => {
						return <Option key={uniqueKeyGenerator()} region={region[0]} selected={region[1]} onClickHandler={selectItem} />
					}
					)}
				</div>
			</div>
		</div>
	)
}

function Option({ region, selected = false, onClickHandler }) {
	return (
		<div onClick={() => onClickHandler(region)} className={`${styles.option} ${selected ? styles.selected : ''}`}>
			{region}
		</div>
	)
}

const clickOutsideConfig = {
	handleClickOutside: () => Filter.handleClickOutside
};

export default onClickOutside(Filter, clickOutsideConfig)