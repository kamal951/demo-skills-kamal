import { Provider } from 'react-redux'
import '../styles/globals.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import HeaderPlus from '../components/headerPlus';
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', (url) => {
	console.log(`Loading: ${url}`)
	NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
	const { store, persistor } = useStore(pageProps.initialReduxState)
	return (
		<Provider store={store}>
			<Head>
				{/* Import CSS for nprogress */}
				<link rel="stylesheet" type="text/css" href="/nprogress.css" />
			</Head>
			<PersistGate loading={null} persistor={persistor}>
				<CssBaseline />
				<HeaderPlus>
					<Component {...pageProps} />
				</HeaderPlus>
			</PersistGate>
		</Provider>
	)
}

export default MyApp
