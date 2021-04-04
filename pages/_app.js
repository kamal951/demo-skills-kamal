import { Provider } from 'react-redux'
import '../styles/globals.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStore } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import HeaderPlus from '../components/headerPlus';

function MyApp({ Component, pageProps }) {
	const { store, persistor } = useStore(pageProps.initialReduxState)
	return (
		<Provider store={store}>
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
