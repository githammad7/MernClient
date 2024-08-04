import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";



const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
  <meta charSet="UTF-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  <title>{title}</title>
       
            </Helmet>
    <Header>
      
    </Header>
        <main style={{minHeight:"80vh"}}>
        
        {children}
        </main>
    
    <Footer>

    </Footer>
      
      
    </>
  )
}
Layout.defaultProps={
  title:"Ecommerce Store",
  description:"Mern Stack Project",
  keywords:"reactjs,node js,express js, mongo db",
  author:"hammad"
}

export default Layout
