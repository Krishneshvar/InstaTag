import './Footer.css'

function Footer() {
    const currYear = new Date().getFullYear();

    return (
        <>
        <footer className='bg-dark text-light d-flex flex-column justify-content-center align-items-center'>
          <div className='curr-yr'>&copy; {currYear}</div>
        </footer>
        </>
    )
}

export default Footer
