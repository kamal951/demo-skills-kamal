import { Provider } from 'react-redux'
import '../styles/globals.css'
// import store from '../redux/store'
import { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {

	// useEffect(() => {
	// 	const jssStyles = document.querySelector('#jss-server-side');
	// 	if (jssStyles) {
	// 		if (jssStyles.parentElement !== null) {
	// 			jssStyles.parentElement.removeChild(jssStyles);
	// 		}
	// 	}

	// })
	const { store, persistor } = useStore(pageProps.initialReduxState)
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<CssBaseline />
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	)
}

export default MyApp
