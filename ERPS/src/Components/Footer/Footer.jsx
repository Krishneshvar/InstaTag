import './Footer.css'

function Footer() {
    const currYear = new Date().getFullYear();

    return (
        <>
        <footer className='bg-dark text-light d-flex flex-column justify-content-center align-items-center'>
          <div className='d-flex justify-content-around'>
            <div className="footer-content p-1">Toll Details</div>
            <div className="footer-content p-1">About Us</div>
            <div className="footer-content p-1">Contact</div>
          </div>
          <div className='curr-yr'>&copy; {currYear}</div>
        </footer>
        </>
    )
}

export default Footer
