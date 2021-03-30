import React from 'react'

import { AppBar, Box, makeStyles, Tab, Tabs } from '@material-ui/core';
import Head from 'next/head'
import Header from '../components/header'
import HomeFilm from '../components/homeFilm'
import HomeSerie from '../components/homeSerie';
import SearchTab from '../components/searchTab';
import { WatchlistTab } from '../components/watchlistTab';
import { LikesTab } from '../components/likesTab';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
}

export default function Home() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Head>
				<title>Demo Skills Kamal</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
					<Tab label="Films" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
					<Tab label="Series" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
					<Tab label="Search" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
					<Tab label="Watchlist" id="simple-tab-4" aria-controls="simple-tabpanel-4" />
					<Tab label="Likes" id="simple-tab-5" aria-controls="simple-tabpanel-5" />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}><HomeFilm /></TabPanel>
			<TabPanel value={value} index={1}><HomeSerie /> </TabPanel>
			<TabPanel value={value} index={2}><SearchTab /> </TabPanel>
			<TabPanel value={value} index={3}><WatchlistTab /> </TabPanel>
			<TabPanel value={value} index={4}><LikesTab /> </TabPanel>

			<footer>
				Kamal
			</footer>
		</div>
	)
}
