import React, { useEffect, useState } from 'react'

import { AppBar, Box, makeStyles, Modal, Tab, Tabs } from '@material-ui/core';
import Head from 'next/head'
import Header from '../components/header'
import HomeFilm from '../components/homeFilm'
import HomeSerie from '../components/homeSerie';
import SearchTab from '../components/searchTab';
import { WatchlistTab } from '../components/watchlistTab';
import { LikesTab } from '../components/likesTab';
import { useDispatch, useSelector } from 'react-redux';


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

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const login_type = useSelector(state => state.userReducer.login_type)

	const tabList = [
		{
			label: "Watchlist",
			id: "simple-tab-4",
			ariaControls: "simple-tabpanel-4",
			index: 3,
			component: <WatchlistTab />
		},
		{
			label: "Likes",
			id: "simple-tab-5",
			ariaControls: "simple-tabpanel-5",
			index: 4,
			component: <LikesTab />
		}]
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
					{login_type === "user" ?
						tabList.map((item) => {
							return (
								<Tab key={"tab-"+item.id} label={item.label} id={item.id} aria-controls={item.ariaControls} />
							)
						})
						: null
					}
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}><HomeFilm /></TabPanel>
			<TabPanel value={value} index={1}><HomeSerie /> </TabPanel>
			<TabPanel value={value} index={2}><SearchTab /> </TabPanel>
			{login_type === "user" ?
				tabList.map((item) => {
					return <TabPanel key={"tabpanel-"+item.id} value={value} index={item.index}>{item.component} </TabPanel>
				}) : null
			}
			<footer>
				Kamal
			</footer>
		</div>
	)
}
