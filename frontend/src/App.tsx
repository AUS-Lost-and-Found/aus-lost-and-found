import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {

    return (
        <>
            <div className='w-screen h-screen overflow-x-hidden'>
                <Navbar />
                <Hero />
            </div>
        </>
    )
}

export default App
