import styled from 'styled-components'
import Head from 'next/head'
import React, { FunctionComponent, useEffect, useState } from 'react'
import axios from 'axios'
import { configuration } from '../configuration'
import AquaClient from '../graphql/aquaClient'
import { Streamer, StreamerBonus } from '../models/streamer'
import Wrapper from '../components/Layouts/Wrapper'
import lowerCase from 'lodash/lowerCase'
import BonusStripe from '../components/BonusStripe/BonusStripe'
import VideoDiscalimer from '../components/VideoDisclaimer/VideoDisclaimer'
import FullPageLoader from '../components/FullPageLoader'
import Container from '../components/Layouts/Container'

interface Props {
	streamerData: Streamer
}

const index: FunctionComponent<Props> = ({ streamerData }) => {
	const [loading, setLoading] = useState(true)
	const [country, setCountry] = useState<string>('')
	useEffect(() => {
		// console.log(country)
		if (country !== '') getBonusList()
	}, [country])
	const [bonuses, setBonuses] = useState<StreamerBonus[] | undefined>(
		undefined
	)
	useEffect(() => {
		// console.log(bonuses)
	}, [bonuses])

	useEffect(() => {
		geoLocate()
	}, [])

	const geoLocate = async () => {
		const userCountryRequest = await axios.get(configuration.geoApi)
		const countryCode = lowerCase(userCountryRequest.data.country_code2)
		if (countryCode) setCountry(countryCode)
	}

	// const getBonusList = async () => {
	//     let bonusForCountry = streamerData.countryBonusList.filter(it => it.label === country)
	//     if(bonusForCountry.length == 0) bonusForCountry = streamerData.countryBonusList.filter(it => it.label === 'row')

	//     const requests = bonusForCountry[0].bonuses.map(b =>  axios.get(`${configuration.api}/bonuses/${b.id}`))

	//     const bList = await Promise.all(requests)

	//     console.log(bList.map(r => r.data as StreamerBonus[]))

	//     setBonuses(bList.map(r => r.data as StreamerBonus))
	//     setLoading(false)
	// }

	const getBonusList = async () => {
		let bonusForCountry = streamerData.countryBonusList.filter(
			it => it.label === country
		)[0].bonuses

		console.log(bonusForCountry, country)

		if (bonusForCountry.length == 0) {
			bonusForCountry = streamerData.countryBonusList.filter(
				it => it.label === 'row'
			)[0].bonuses
			setCountry('row')
		}

		const ordering = streamerData.countryBonusList
			.filter(it => it.label === country)[0]
			.ordering.split(' ')

		// const requests = bonusForCountry[0].bonuses.map((b) =>
		//   axios.get(`${configuration.api}/bonuses/${b.id}`)
		// );

		// const bList = await Promise.all(requests);
		// let unorderedBonuses = bList.map((r) => r.data as StreamerBonus);

		let unorderedBonuses = [...bonusForCountry]

		let ordered: StreamerBonus[] = []

		ordering.forEach(code => {
			const matchingBonus = unorderedBonuses.find(
				it => it.compareCode === code
			)
			if (matchingBonus) {
				ordered.push(matchingBonus)
				unorderedBonuses = unorderedBonuses.filter(
					b => b.compareCode !== code
				)
			}
		})
		console.log(streamerData.bonuses)
		const finalList = [...ordered].map(b =>
			streamerData.bonuses.find(it => it.id == b.id)
		)

		console.log(finalList, 'final list')

		setBonuses(finalList as any)
		setLoading(false)
	}

	const openWebsite = () => window.open('https://www.spikeslot.com')

	if (loading) return <FullPageLoader />
	return (
		<Wrapper>
			<Container>
				<div
					className='top-bar'
					style={{ cursor: 'pointer' }}
					onClick={() => openWebsite()}
				>
					<img className='logo' src='/icons/app_icon.png' />
				</div>

				{country === 'it' && (
					<div
						style={{
							backgroundColor: '#f5f5f5',
							paddingRight: '30px',
							paddingLeft: '30px',
							paddingTop: '10px',
							textAlign: 'center',
							fontSize: '11px',
							color: '#666',
						}}
					>
						Queste sono informazioni atte a riconoscere e comparare
						siti di gioco legale nel tuo paese. Ricordati che al
						gioco alla lunga si perde, perchè i giochi con vincite
						sono concepiti per restituire alla lunga una percentuale
						inferiore a quella giocata, quindi se nella singola
						partita può capitare di vincere, alla lunga è
						praticamente impossibile. Se decidi di procedere, sappi
						che stai rischiando di perdere i tuoi soldi.
					</div>
				)}

				<div
					style={{
						position: 'fixed',
						bottom: '0',
						left: '0',
						backgroundColor: 'red',
						width: '100%',
						padding: '10px 0px',
						zIndex: 100,
					}}
				>
					<div
						style={{
							color: 'white',
							fontWeight: 'bold',
							fontSize: '.8rem',
							textAlign: 'center',
						}}
					>
						<div>Comparazione offerte di siti legali in Italia</div>
					</div>
				</div>

				{bonuses &&
					bonuses.length > 2 &&
					bonuses.map((bonus: StreamerBonus) => (
						<BonusStripe
							key={`${bonus.name}`}
							bonus={bonus}
							countryCode={country}
						/>
					))}

				{bonuses &&
					bonuses.length <= 2 &&
					streamerData.bonuses.map((bonus: StreamerBonus) => (
						<BonusStripe
							key={`${bonus.name}`}
							bonus={bonus}
							countryCode={country}
						/>
					))}

				<div style={{ padding: '1rem' }}>
					<VideoDiscalimer />
				</div>
				{/* <div className='bottom'>
                    <p style={{textAlign : 'center'}}>This service is provided by <a href='https://www.topaffiliation.com'>Top Affiliation</a></p>
                </div> */}
			</Container>
		</Wrapper>
	)
}

export async function getServerSideProps({ query }) {
	const pickedBonus = query.options

	const aquaClient = new AquaClient()

	const streamer = await axios.get(
		`${configuration.api}/streamers/${configuration.streamerId}`
	)

	return {
		props: {
			streamerData: streamer.data as Streamer,
		},
	}
}

export default index
