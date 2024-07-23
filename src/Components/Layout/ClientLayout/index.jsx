import Footer from "../../Footers/Footer"
import HeaderLayout from "../../Header"

const ClientLayout = ({ children }) => {
    return (
        <>
            <HeaderLayout />

            {children}

            <Footer />
        </>
    )
}

export default ClientLayout